from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    post_date = db.Column(db.Date, nullable=False)
    added_by_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)#fk at the many side
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)

    images = db.relationship('Media', primaryjoin='and_(Media.owner_id==Product.id, Media.owner_type=="product")', backref='product')

    # relationships - many side
    user = db.relationship("User", back_populates="products")
    category = db.relationship("Category", back_populates="products")
    # relationship - one side
    cart_items = db.relationship("ShoppingCartItem", back_populates="product")
    transaction_items = db.relationship("TransactionItem", back_populates="product")
    reviews = db.relationship("Review", back_populates="product")
