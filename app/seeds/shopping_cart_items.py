from app.models import db, ShoppingCartItem, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_cart_items():
    marnie_id = User.query.filter_by(username='marnie').first().id
    bobbie_id = User.query.filter_by(username='bobbie').first().id

    marnie_cart = ShoppingCartItem(product_id=5, quantity=1)  # Speed Stacks

    bobbie_cart = ShoppingCartItem(product_id=1, quantity=1)  # Camel Up

    db.session.add_all([marnie_cart, bobbie_cart])
    db.session.commit()

def undo_shopping_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
    db.session.commit()
