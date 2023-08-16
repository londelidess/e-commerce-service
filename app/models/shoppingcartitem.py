from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShoppingCartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Integer)

    # relationship - many side
    product = db.relationship("Product", back_populates="cart_items")
    user = db.relationship("User", back_populates="cart_items")

    def to_dict(self):
        if not self.product:
            return {
                'id': self.id,
                'product_id': self.product_id,
                'product_name': 'Product not found',
                'quantity': self.quantity,
                'single-price': None,
                'total_price': None
            }

        total_price = self.product.price * self.quantity
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product_name': self.product.name,
            'quantity': self.quantity,
            'single-price': self.product.price,
            'total_price': total_price
        }
