from .db import db, environment, SCHEMA

class Media(db.Model):
    __tablename__ = 'medias'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, nullable=False)
    media_type = db.Column(db.String, nullable=False, default='image')
    media_url = db.Column(db.String, nullable=False)
    owner_type = db.Column(db.String(50), nullable=False)  # 'product', 'review'

    #dict
    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "media_type": self.media_type,
            "media_url": self.media_url,
            "owner_type": self.owner_type
    }
