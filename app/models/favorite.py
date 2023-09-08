from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    added_on = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # relationships
    user = db.relationship("User", back_populates="favorites")
    product = db.relationship("Product", back_populates="favorited_by")
