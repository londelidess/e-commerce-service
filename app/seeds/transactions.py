from app.models import db, Transaction, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transactions():

    marnie_id = User.query.filter_by(username='marnie').first().id
    bobbie_id = User.query.filter_by(username='bobbie').first().id

    marnie_transaction = Transaction(user_id=marnie_id, total_amount=47.97)
    bobbie_transaction = Transaction(user_id=bobbie_id, total_amount=68.17)

    db.session.add_all([marnie_transaction, bobbie_transaction])
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))
    db.session.commit()
