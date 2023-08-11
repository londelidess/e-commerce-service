from datetime import datetime
from app.models import db, Transaction, User,  TransactionItem, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transaction_items():

    digimon_deck_id = Product.query.filter_by(name='Digimon Card Game Starter Decks').first().id
    pokemon_puzzle_id = Product.query.filter_by(name='Pokemon Jigsaw Puzzle').first().id

    marnie_transaction_id = Transaction.query.filter_by(user_id=User.query.filter_by(username='marnie').first().id).first().id
    bobbie_transaction_id = Transaction.query.filter_by(user_id=User.query.filter_by(username='bobbie').first().id).first().id

    marnie_item = TransactionItem(
        transaction_id=1,
        product_id=2,
        quantity=1,
        price_at_time_of_purchase=47.97
        )
    bobbie_item_1 = TransactionItem(
        transaction_id=2,
        product_id=1,
        quantity=1,
        price_at_time_of_purchase=31.99
        )
    bobbie_item_2 = TransactionItem(
        transaction_id=2,
        product_id=3,
        quantity=1,
        price_at_time_of_purchase=19.18
        )

    db.session.add_all([marnie_item, bobbie_item_1, bobbie_item_2])
    db.session.commit()

def undo_transaction_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transaction_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transaction_items"))
    db.session.commit()
