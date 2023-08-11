from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow())
    total_amount = db.Column(db.Numeric(10, 2))

    # relationship - one side
    transaction_items = db.relationship("TransactionItem", back_populates="transaction")

    def to_dict(self, include_items=False):
        data = {
            'id': self.id,
            'user_id': self.user_id,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S') if self.timestamp else None,
            'total_amount': float(self.total_amount) if self.total_amount else None,
        }

        if include_items:
            data['items'] = [item.to_dict() for item in self.transaction_items]

        return data
