from app.models import db, ShoppingCartItem, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_cart_items():
    marnie_id = User.query.filter_by(username='marnie').first().id
    bobbie_id = User.query.filter_by(username='bobbie').first().id
    demo_id = User.query.filter_by(username='Demo').first().id

    marnie_cart1 = ShoppingCartItem(product_id=5, user_id=marnie_id, quantity=1)  # Speed Stacks
    marnie_cart2 = ShoppingCartItem(product_id=2, user_id=marnie_id, quantity=2)  # Digimon Card Game Starter Decks
    marnie_cart3 = ShoppingCartItem(product_id=3, user_id=marnie_id, quantity=1)  # Pokemon Jigsaw Puzzle

    bobbie_cart1 = ShoppingCartItem(product_id=1, user_id=bobbie_id, quantity=1)  # Camel Up
    bobbie_cart2 = ShoppingCartItem(product_id=4, user_id=bobbie_id, quantity=3)  # JR BEAT-MAGNUM PREMIUM
    bobbie_cart3 = ShoppingCartItem(product_id=6, user_id=bobbie_id, quantity=2)  # Throw Throw Avocado

    demo_cart1 = ShoppingCartItem(product_id=7, user_id=demo_id, quantity=1)  # JENGA
    demo_cart2 = ShoppingCartItem(product_id=2, user_id=demo_id, quantity=1)  # Digimon Card Game Starter Decks
    demo_cart3 = ShoppingCartItem(product_id=4, user_id=demo_id, quantity=2)  # JR BEAT-MAGNUM PREMIUM

    db.session.add_all([marnie_cart1, marnie_cart2, marnie_cart3, bobbie_cart1, bobbie_cart2, bobbie_cart3, demo_cart1, demo_cart2, demo_cart3])
    db.session.commit()

def undo_shopping_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
    db.session.commit()
