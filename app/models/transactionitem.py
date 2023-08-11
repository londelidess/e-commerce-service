from .db import db, environment, SCHEMA, add_prefix_for_prod


class TransactionItem(db.Model):
    __tablename__ = 'transaction_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    transaction_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer)
    price_at_time_of_purchase = db.Column(db.Float(10, 2))

    # relationship - many side
    transaction = db.relationship("Transaction", back_populates="transaction_items")
    product = db.relationship("Product", back_populates="transaction_items")

    def to_dict(self):
        return {
            'id': self.id,
            'transaction_id': self.transaction_id,
            'product_id': self.product_id,
            'product_name': self.product.name,
            'quantity': self.quantity,
            'price_at_time_of_purchase': float(self.price_at_time_of_purchase) if self.price_at_time_of_purchase else None,
        }
