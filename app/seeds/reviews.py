from datetime import datetime
from app.models import db, Product, Review

def seed_reviews():
    camel_up = Product.query.filter_by(name='Camel Up').first()
    digimon_deck = Product.query.filter_by(name='Digimon Card Game Starter Decks').first()
    pokemon_puzzle = Product.query.filter_by(name='Pokemon Jigsaw Puzzle').first()
    beat_magnum = Product.query.filter_by(name='JR BEAT-MAGNUM PREMIUM').first()
    jenga = Product.query.filter_by(name='JENGA').first()
    throw_avocado = Product.query.filter_by(name='Throw Throw Avocado').first()
    speed_stacks = Product.query.filter_by(name='Speed Stacks').first()

    review1 = Review(
        product_id=camel_up.id,
        user_id=3,
        review_text="Loved playing Camel Up with my family! It's unpredictable and loads of fun.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review2 = Review(
        product_id=digimon_deck.id,
        user_id=3,
        review_text="The Digimon Card Game brings back so many memories. The starter decks are a great way to get into the game.",
        rating=4,
        review_date=datetime.utcnow()
    )

    review3 = Review(
        product_id=pokemon_puzzle.id,
        user_id=3,
        review_text="The Pokemon Jigsaw Puzzle is challenging yet enjoyable. The pieces fit well, and the final image looks fantastic.",
        rating=4,
        review_date=datetime.utcnow()
    )

    review4 = Review(
        product_id=beat_magnum.id,
        user_id=4,
        review_text="The JR BEAT-MAGNUM PREMIUM is a high-quality model kit. Assembling it was a delight.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review5 = Review(
        product_id=jenga.id,
        user_id=4,
        review_text="Jenga is a timeless classic. Great quality blocks.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review6 = Review(
        product_id=throw_avocado.id,
        user_id=3,
        review_text="Throw Throw Avocado is a unique and fun party game. It was the highlight of our last game night.",
        rating=5,
        review_date=datetime.utcnow()
    )

    review7 = Review(
        product_id=speed_stacks.id,
        user_id=4,
        review_text="The Speed Stacks set is perfect for anyone looking to get into competitive stacking. The timer and mat are of excellent quality.",
        rating=5,
        review_date=datetime.utcnow()
    )

    # Add reviews to session and commit
    db.session.add_all([review1, review2, review3, review4, review5, review6, review7])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
