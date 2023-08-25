from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .products import seed_products, undo_products
from .favorites import seed_favorites, undo_favorites
from .reviews import seed_reviews, undo_reviews
from .medias import seed_medias, undo_medias
from .shopping_cart_items import seed_shopping_cart_items, undo_shopping_cart_items
from .transactions import seed_transactions, undo_transactions
from .transaction_items import seed_transaction_items, undo_transaction_items


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_transaction_items()
        undo_transactions()
        undo_shopping_cart_items()
        undo_medias()
        undo_reviews()
        undo_favorites()
        undo_products()
        undo_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_products()
    seed_favorites()
    seed_reviews()
    seed_medias()
    seed_shopping_cart_items()
    seed_transactions()
    seed_transaction_items()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_transaction_items()
    undo_transactions()
    undo_shopping_cart_items()
    undo_medias()
    undo_reviews()
    undo_favorites()
    undo_products()
    undo_categories()
    undo_users()
    # Add other undo functions here


        # op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        # op.execute(f"ALTER TABLE categories SET SCHEMA {SCHEMA};")
        # op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")

        # op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
        # op.execute(f"ALTER TABLE medias SET SCHEMA {SCHEMA};")


        # op.execute(f"ALTER TABLE cart_items SET SCHEMA {SCHEMA};")
        # op.execute(f"ALTER TABLE transactions SET SCHEMA {SCHEMA};")
        # op.execute(f"ALTER TABLE transaction_items SET SCHEMA {SCHEMA};")
