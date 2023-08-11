from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():

    games = Category(name='Games')
    puzzles = Category(name='Puzzles')
    model_kit = Category(name='Model Kits')

    db.session.add_all([ games, puzzles, model_kit])
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
    db.session.commit()
