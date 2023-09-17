from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review_text = db.Column(db.String)
    rating = db.Column(db.Integer)
    review_date = db.Column(db.DateTime, default=datetime.utcnow)
    media_url = db.Column(db.String, nullable=True)

    # Relationships - many side
    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        data = {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'review_text': self.review_text,
            'rating': self.rating,
            'review_date': self.review_date.strftime('%Y-%m-%d %H:%M:%S') if self.review_date else None,
            'media_url': self.media_url
        }

        if self.user:
            data['user'] = {
                'id': self.user.id,
                'username': self.user.username,
            }

        if self.product:
            data['product'] = {
                'id': self.product.id,
                'name': self.product.name,
            }

        return data
