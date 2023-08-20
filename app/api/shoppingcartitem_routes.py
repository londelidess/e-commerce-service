from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import ShoppingCartItem,Transaction,TransactionItem, db, Product
from sqlalchemy import func

shoppingcartitem_routes = Blueprint('shoppingcarts', __name__)

@shoppingcartitem_routes.route('/', methods=['GET'])
@login_required
def get_cart():
    '''Fetch all items in the cart for the currently logged-in user.'''
    user_id = current_user.id
    cart_items = ShoppingCartItem.query.filter_by(user_id=user_id).all()

    # Calculate subtotal and total quantity
    subtotal = sum(item.product.price * item.quantity for item in cart_items if item.product)
    total_quantity = sum(item.quantity for item in cart_items)

    return jsonify({
        'items': [item.to_dict() for item in cart_items],
        'subtotal': subtotal,
        'total_quantity': total_quantity
    })
    
# @shoppingcartitem_routes.route('/', methods=['GET'])
# @login_required
# def get_cart():
#     '''Fetch all items in the cart for the currently logged-in user. Same products are combined'''
#     user_id = current_user.id

#     cart_items = db.session.query(
#         ShoppingCartItem.product_id,
#         func.sum(ShoppingCartItem.quantity).label('total_quantity')
#     ).filter_by(user_id=user_id).group_by(ShoppingCartItem.product_id).all()

#     cart_items_dicts = []
#     for item in cart_items:
#         product = Product.query.get(item.product_id)
#         if product:
#             total_price = product.price * item.total_quantity
#             cart_items_dicts.append({
#                 'product_id': item.product_id,
#                 'product_name': product.name,
#                 'quantity': item.total_quantity,
#                 'single-price': product.price,
#                 'total_price': total_price
#             })

#     return jsonify(cart_items_dicts)

@shoppingcartitem_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
    '''Add a new product to the cart for the currently logged-in user.

    Expected JSON payload:
    {
        "product_id": <product_id>,
        "quantity": <quantity>
    }
    '''
    data = request.json
    user_id = current_user.id
    product_id = data['product_id']
    quantity = data['quantity']

    # Check if the product is already in the cart
    existing_item = ShoppingCartItem.query.filter_by(user_id=user_id, product_id=product_id).first()

    if existing_item:
        # If the product is already in the cart, update the quantity
        existing_item.quantity += quantity
        db.session.commit()
        return jsonify(existing_item.to_dict()), 200
    else:
        # If the product is not in the cart, add a new row
        new_item = ShoppingCartItem(
            product_id=product_id,
            user_id=user_id,
            quantity=quantity
        )
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_dict()), 201

@shoppingcartitem_routes.route('/clear', methods=['DELETE'])
@login_required
def clear_cart():
    '''Clear all items in the cart for the currently logged-in user.'''
    user_id = current_user.id
    cart_items = ShoppingCartItem.query.filter_by(user_id=user_id).all()

    for item in cart_items:
        db.session.delete(item)

    db.session.commit()

    return jsonify({"message": "All items removed from the cart"})

@shoppingcartitem_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_from_cart(product_id):
    '''Remove a specific product from the cart for the currently logged-in user.'''
    user_id = current_user.id
    item = ShoppingCartItem.query.filter_by(user_id=user_id, product_id=product_id).first()

    if not item:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    product = Product.query.get(product_id)
    return jsonify({"message": f"{product.name} was removed from the cart"})

@shoppingcartitem_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def update_cart_item_quantity(product_id):
    '''Update the quantity of a specific product in the cart for the currently logged-in user.

    Expected JSON payload:
    {
        "quantity": <new_quantity>
    }
    '''
    data = request.json
    user_id = current_user.id
    new_quantity = data['quantity']

    cart_item = ShoppingCartItem.query.filter_by(user_id=user_id, product_id=product_id).first()

    if not cart_item:
        return jsonify({"message": "Item not found"}), 404

    cart_item.quantity = new_quantity
    db.session.commit()

    product = Product.query.get(product_id)
    return jsonify({"message": f"Quantity for {product.name} updated to {new_quantity}"})



@shoppingcartitem_routes.route('/checkout', methods=['POST'])
@login_required
def checkout():
    '''Complete the transaction by clearing the cart for the currently logged-in user
    No Expected JSON payload
    '''
    user_id = current_user.id
    cart_items = ShoppingCartItem.query.filter_by(user_id=user_id).all()

    # Calculate total amount for the transaction
    total_amount = sum(item.product.price * item.quantity for item in cart_items)

    # Create a new Transaction
    transaction = Transaction(user_id=user_id, total_amount=total_amount)
    db.session.add(transaction)
    db.session.flush()  # To get the transaction ID since the process is still in the way

    # Create TransactionItems and clear ShoppingCartItems
    for cart_item in cart_items:
        transaction_item = TransactionItem(
            transaction_id=transaction.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price_at_time_of_purchase=cart_item.product.price
        )
        db.session.add(transaction_item)
        db.session.delete(cart_item)

    db.session.commit()

    return jsonify({"message": "Transaction completed", "transaction_id": transaction.id})

@shoppingcartitem_routes.route('/orders/<int:order_id>/reorder', methods=['POST'])
@login_required
def reorder_past_order(order_id):
    '''Reorder a past order for the currently logged-in user.
    {
    "quantity": {
        "3": 1,
        "4":1,
        "5":2
        }
    }
    '''
    # Fetch Past Order
    user_id = current_user.id
    transaction = Transaction.query.filter_by(id=order_id, user_id=user_id).first()
    if not transaction:
        return jsonify({"message": "Order not found"}), 404

    # from payload
    desired_quantities = request.json.get('quantity', {})

    reordered_items = []

    # Add items from the past order to the cart
    for item in transaction.transaction_items:

        # If the product is not in desired_quantities, skip it
        if str(item.product_id) not in desired_quantities:
            continue

        quantity = desired_quantities[str(item.product_id)]

        # Check if the product is already in the cart
        existing_cart_item = ShoppingCartItem.query.filter_by(user_id=user_id, product_id=item.product_id).first()

        if existing_cart_item:
            # If the product is already in the cart, update the quantity
            existing_cart_item.quantity += quantity
            reordered_items.append(existing_cart_item.to_dict())
        else:
            # If the product is not in the cart, add a new row
            cart_item = ShoppingCartItem(
                product_id=item.product_id,
                user_id=user_id,
                quantity=quantity
            )
            db.session.add(cart_item)
            reordered_items.append(cart_item.to_dict())

    db.session.commit()  # Commit changes to the database

    return jsonify({
        "message": f"Reordered items from order with ID {order_id}",
        "reordered_items": reordered_items
    })

@shoppingcartitem_routes.route('/orders', methods=['GET'])
@login_required
def get_past_orders():
    '''Fetch all past orders for the currently logged-in user.'''
    user_id = current_user.id
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    return jsonify([transaction.to_dict(include_items=True) for transaction in transactions])

@shoppingcartitem_routes.route('/ordered-items', methods=['GET'])
@login_required
def get_ordered_items():
    '''Fetch all unique items ever ordered by the currently logged-in user.'''
    user_id = current_user.id

    transactions = Transaction.query.filter_by(user_id=user_id).all()
    unique_product_ids = set()

    for transaction in transactions:
        for item in transaction.transaction_items:
            unique_product_ids.add(item.product_id)

    unique_products = Product.query.filter(Product.id.in_(unique_product_ids)).all()

    return jsonify([product.to_dict() for product in unique_products])
