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
        description="""The Digimon Card Game is a competitive trading card game. Each player has a companion Digimon in the battle area to attack the opponent. Your Digimon evolves, gets stronger, and gains new power! You win by beating your opponent's security (reducing your opponent's Security Area cards to zero) and delivering a knockout blow!""",
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
        description="""This is a Premium release in the Fully Cowled Mini 4WD series of the Beat-Magnum. This car was driven by hero Go Seiba in the popular Mini 4WD cartoon series "Let"s & Go!!". It utilizes the AR Chassis, which places great emphasis upon aerodynamics, also offering users a blend of durability, customization and ease of maintenance.""",
        price=49.99,
        added_by_user_id=1,
        category_id=model_kit_id
    )

    game3 = Product(
        name='JENGA',
        description="""Jenga is a game of physical and mental skill. Built on the simple premise of stacking blocks, Jenga engages players of all ages, across all cultures. Jenga's success rests on its solid play value. Players take turns to remove a block from a tower and balance it on top, creating a taller and increasingly unstable structure as the game progresses.""",
        price=15.99,
        added_by_user_id=1,
        category_id=games_id
    )
    game4 = Product(
        name='Throw Throw Avocado',
        description="""The First Dodgeball Card Game - Collect Matching Sets Of Cards Faster Than Your Opponents While Simultaneously Ducking, Dodging And Throwing New Squishy Airborne Avocados. A Simple And Easy Game For Kids And Adults - Clear Some Space And Put Away The Antiques, Because You'Ve Never Played A Party Game Quite Like This.""",
        price=24.99,
        added_by_user_id=1,
        category_id=games_id
    )

    game5 = Product(
        name='Speed Stacks',
        description="""Cup stacking with Speed Stacks is an exciting individual and team sport that promotes hand-eye coordination, ambidexterity, quickness and concentration. Cup stacking helps students use both sides of their bodies and brains to develop important athletic and lifelong skills.""",
        price=49.99,
        added_by_user_id=1,
        category_id=games_id
    )

    puzzle2 = Product(
        name="""Rubik's 3x3""",
        description="""There are... wait for it... 43,252,003,274,489,856,000 ways of arranging the squares, and only one of these is the solution. Turn and twist away – can you solve it? The new and improved Rubik’s Cube features a mechanism that results in a smoother, faster and more reliable play.""",
        price=10.99,
        added_by_user_id=2,
        category_id=puzzles_id
    )


    puzzle3 = Product(
        name="""Starry Night Orrery Mechanical Music Box""",
        description="""This is vintage orrery DIY music box. It is inspired by the solar system model, made of colorful acrylic and circles while tunes playing. Have fun building this creative music box 3D wooden puzzle!""",
        price=31.99,
        added_by_user_id=2,
        category_id=puzzles_id
    )

    puzzle4 = Product(
        name="""Blokus""",
        description="""Perfect strategy game for the whole family – less than a minute to learn with fun challenges for all ages! The game ends when no more pieces can be placed down, and the player with the lowest number remaining wins!""",
        price=19.99,
        added_by_user_id=2,
        category_id=puzzles_id
    )

    model2 = Product(
        name='Black Pearl Model Ship',
        description="""Jack Sparrow ship - Pirates of the Caribbean. This crucifix is absolutely beautiful! We hung it in a very prominent place in our home in a room with a cathedral ceiling. You have to look up on it... and when you do, feels like you're at the foot of the cross. An heirloom!""",
        price=337.50,
        added_by_user_id=2,
        category_id=model_kit_id
    )

    model3 = Product(
        name='RX-78F00 GUNDAM & G-DOCK',
        description="""Limited edition of the moving full-scale Gundam of "GUNDAM FACTORY YOKOHAMA"! The behavior of a moving Gundam with a G dock can be reproduced on a 1/144 scale. ■ A range of motion that can reproduce the behavior of a moving Gundam such as walking, raising the right arm, and raising both arms!""",
        price=32.00,
        added_by_user_id=2,
        category_id=model_kit_id
    )

    model4 = Product(
        name='Digimon Figure-rise Standard Amplified Machinedramon',
        description="""The largest kit in the series! The extremely popular machine-type Digimon joins the lineup! It's a massive 9.8 inches long kit when extended to its limits. The kit comes with two wires, and one set of foil stickers""",
        price=74.99,
        added_by_user_id=2,
        category_id=model_kit_id
    )

    model5 = Product(
        name='Batman, Bandai Spirits Figure-Rise Standard Amplified Model Kit',
        description="""The cape can be expanded to recreate the iconic Batman silhouette. He comes with a batarang as well as a hand to hold it. Part of the cape can be removed and attached to the arm to form a shield. The cape is made of PP material to create a texture that's both hard and soft. The base of the cape is separated so it won't get in the way of posing.""",
        price=76.77,
        added_by_user_id=2,
        category_id=model_kit_id
    )

    model6 = Product(
        name='Keroro & Keroro Robot Mk-II Anniversary Special Ver.',
        description="""To celebrate the 20th anniversary of "Sgt. Frog" (Keroro Gunsou) Bandai is bringing back the Sgt. Frog Plamo Collection! This kit builds into Sergeant Keroro along with the Keroro Robot Mk-II, and features special packaging to commemorate the series' anniversary. It also comes with the Kero Ball, a beam rifle, and a shield.""",
        price=9.56,
        added_by_user_id=2,
        category_id=model_kit_id
    )

    db.session.add_all([game1, game2, puzzle1, model1, game3, game4, game5, puzzle2, puzzle3, puzzle4, model2, model3, model4, model5, model6])
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
