from .db import db, environment, SCHEMA, add_prefix_for_prod
from .media import Media
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(400), nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    post_date = db.Column(db.Date, nullable=False, default = datetime.utcnow())
    added_by_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)#fk at the many side
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)

    images = db.relationship("Media", back_populates="product", cascade="all, delete-orphan")
    # relationships - many side
    user = db.relationship("User", back_populates="products")
    category = db.relationship("Category", back_populates="products")
    # relationship - one side
    cart_items = db.relationship("ShoppingCartItem", back_populates="product",cascade="all, delete")
    transaction_items = db.relationship("TransactionItem", back_populates="product")
    reviews = db.relationship("Review", back_populates="product")

    def get_primary_image(self):
        return self.images[0].media_url if self.images else None

    def to_dict(self, include_category=False):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price if self.price else None,
            'post_date': self.post_date.strftime('%Y-%m-%d') if self.post_date else None,
            'added_by_user_id': self.added_by_user_id,
            'category_id': self.category_id,
            'images':[image.to_dict() for image in self.images] if self.images else [],
            'category_name': self.category.name if self.category else None,
        }
        # if include_category and self.category:
        #     data['category_name'] = self.category.name
        data['primary_image'] = self.get_primary_image()

        return data
