from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .media import Media

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review_text = db.Column(db.Text)
    rating = db.Column(db.Integer)
    review_date = db.Column(db.DateTime, default=datetime.utcnow)

    images = db.relationship(
        'Media',
        primaryjoin=db.and_(
            db.foreign(Media.owner_id) == id,
            db.foreign(Media.owner_type) == "review"
        ),
        backref='review'
    )

    # Relationships - many side
    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

def to_dict(self, include_user=False, include_product=False):
    data = {
        'id': self.id,
        'product_id': self.product_id,
        'user_id': self.user_id,
        'review_text': self.review_text,
        'rating': self.rating,
        'review_date': self.review_date.strftime('%Y-%m-%d %H:%M:%S') if self.review_date else None,
    }

    if include_user and self.user:
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
        }

    if include_product and self.product:
        data['product'] = {
            'id': self.product.id,
            'name': self.product.name,
        }

    if self.images:
        data['images'] = [image.to_dict() for image in self.images] 

    return data
