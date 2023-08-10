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
