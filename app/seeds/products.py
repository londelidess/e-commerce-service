from datetime import datetime
from app.models import db, Product, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():

    games_id = Category.query.filter_by(name='Games').first().id
    puzzles_id = Category.query.filter_by(name='Puzzles').first().id
    model_kit_id = Category.query.filter_by(name='Model Kits').first().id

    game1 = Product(
        name='Camel Up',
        description="""In Camel Up, up to eight players bet on five racing camels, trying to suss out which will place first and second in a quick race around a pyramid. The earlier you place your bet, the more you can win — should you guess correctly, of course. Camels don't run neatly, however, sometimes landing on top of another one and being carried toward the finish line. """,
        price=31.99,
        added_by_user_id=1,
        category_id=games_id
    )

    game2 = Product(
        name='Digimon Card Game Starter Decks',
        description="""The Digimon Card Game is a competitive trading card game. Each player has a companion Digimon in the battle area to attack the opponent. Your Digimon evolves, gets stronger, and gains new power! You win by beating your opponent\’s security (reducing your opponent’s Security Area cards to zero) and delivering a knockout blow!""",
        price=47.97,
        added_by_user_id=1,
        category_id=games_id
    )


    puzzle1 = Product(
        name='Pokemon Jigsaw Puzzle',
        description="""Unleash the power and nostalgia of Pokémon through a captivating jigsaw puzzle collection! Dive into the challenge and rekindle your love for Pokémon, one puzzle piece at a time!""",
        price=19.18,
        added_by_user_id=1,
        category_id=puzzles_id
    )

    model1 = Product(
        name='JR BEAT-MAGNUM PREMIUM',
        description="""This is a Premium release in the Fully Cowled Mini 4WD series of the Beat-Magnum (original Item: 19421). This car was driven by hero Go Seiba in the popular Mini 4WD cartoon series "Let"s & Go!!". It utilizes the AR Chassis, which places great emphasis upon aerodynamics, also offering users a blend of durability, customization and ease of maintenance.""",
        price=49.99,
        added_by_user_id=1,
        category_id=model_kit_id
    )

    game3 = Product(
        name='JENGA',
        description="""Jenga is a game of physical and mental skill. Built on the simple premise of stacking blocks, Jenga engages players of all ages, across all cultures. Jenga\'s success rests on its solid play value. Players take turns to remove a block from a tower and balance it on top, creating a taller and increasingly unstable structure as the game progresses.""",
        price=15.99,
        added_by_user_id=1,
        category_id=games_id
    )
    game4 = Product(
        name='Throw Throw Avocado',
        description="""The First Dodgeball Card Game - Collect Matching Sets Of Cards Faster Than Your Opponents While Simultaneously Ducking, Dodging And Throwing New Squishy Airborne Avocados. A Simple And Easy Game For Kids And Adults - Clear Some Space And Put Away The Antiques, Because You\'Ve Never Played A Party Game Quite Like This. The Cards You Collect Earn You Points, But You Lose Points When You Get Hit By Squishy Avocados.""",
        price=24.99,
        added_by_user_id=1,
        category_id=games_id
    )

    game5 = Product(
        name='Speed Stacks',
        description="""The Digimon Card Game is a competitive trading card game. Each player has a companion Digimon in the battle area to attack the opponent. Your Digimon evolves, gets stronger, and gains new power! You win by beating your opponent\’s security (reducing your opponent’s Security Area cards to zero) and delivering a knockout blow!""",
        price=49.99,
        added_by_user_id=1,
        category_id=games_id
    )


    db.session.add_all([game1, game2, puzzle1, model1, game3, game4, game5])
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
