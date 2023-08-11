from datetime import datetime
from app.models import db, Product, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():

    review1 = Review(
        product_id=1,
        user_id=3,
        review_text="Loved playing Camel Up with my family! It's unpredictable and loads of fun.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review2 = Review(
        product_id=2,
        user_id=3,
        review_text="The Digimon Card Game brings back so many memories. The starter decks are a great way to get into the game.",
        rating=4,
        review_date=datetime.utcnow()
    )

    review3 = Review(
        product_id=3,
        user_id=3,
        review_text="The Pokemon Jigsaw Puzzle is challenging yet enjoyable. The pieces fit well, and the final image looks fantastic.",
        rating=4,
        review_date=datetime.utcnow()
    )

    review4 = Review(
        product_id=4,
        user_id=4,
        review_text="The JR BEAT-MAGNUM PREMIUM is a high-quality model kit. Assembling it was a delight.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review5 = Review(
        product_id=5,
        user_id=4,
        review_text="Jenga is a timeless classic. Great quality blocks.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review6 = Review(
        product_id=6,
        user_id=3,
        review_text="Throw Throw Avocado is a unique and fun party game. It was the highlight of our last game night.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review7 = Review(
        product_id=7,
        user_id=4,
        review_text="The Speed Stacks set is perfect for anyone looking to get into competitive stacking. The timer and mat are of excellent quality.",
        rating=5,
        review_date=datetime.utcnow()
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
