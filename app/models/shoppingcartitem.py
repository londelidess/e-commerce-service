from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShoppingCartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer)

    # relationship - many side
    product = db.relationship("Product", back_populates="cart_items")
