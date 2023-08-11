from .db import db, environment, SCHEMA, add_prefix_for_prod

class Media(db.Model):
    __tablename__ = 'medias'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    media_type = db.Column(db.String, nullable=False, default='image')
    media_url = db.Column(db.String, nullable=False)

    product = db.relationship("Product", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "media_type": self.media_type,
            "media_url": self.media_url
        }
