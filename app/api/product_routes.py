from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, db, Category
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms import ProductForm

product_routes = Blueprint('products', __name__)

allowed_roles = ('admin', 'editor')

@product_routes.route('/', methods=['GET'])
def get_all_products():
    """route to fetch and display all products"""
    products = Product.query.all()
    return jsonify([prod.to_dict() for prod in products])

@product_routes.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """returns a single product by the given route param id"""
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.to_dict())
    return jsonify({"message": "Product not found"}), 404

@product_routes.route('/categories', methods=['GET'])
def get_categories():
    """get all categories"""
    categories = Category.query.all()
    return jsonify([{"id": category.id, "name": category.name} for category in categories])

@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    if current_user.role not in allowed_roles:
        return jsonify({"message": "Permission denied."}), 403

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    categories = Category.query.all()
    form.category_id.choices = [(category.id, category.name) for category in categories]


    if form.validate_on_submit():
        new_product = Product(
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            added_by_user_id=current_user.id,
            category_id=form.data['category_id']
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.to_dict()), 201
    else:
        return jsonify({"message": "Invalid form data.", "errors": form.errors}), 400


@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def update_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    if current_user.role not in allowed_roles:
        return jsonify({"message": "Permission denied."}), 403


    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    categories = Category.query.all()
    form.category_id.choices = [(category.id, category.name) for category in categories]

    if form.validate_on_submit():

        product.name = form.data["name"]
        product.description = form.data["description"]
        product.price = form.data["price"]
        product.category_id = form.data["category_id"]

        db.session.commit()
        return jsonify(product.to_dict()), 200
    else:
        return jsonify({"message": "Invalid form data.", "errors": form.errors}), 400

@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    if current_user.role not in allowed_roles:
        return jsonify({"message": "Permission denied."}), 403

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200
