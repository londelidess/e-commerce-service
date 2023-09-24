from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    owner = User(
        username='Owner',
        email='owner@aa.io',
        password='owner',
        profile_image_url='https://64.media.tumblr.com/1b92dccaf54b1bed9599a2e97167760d/a8a000f166be391d-d8/s540x810/26bdc54fd0f2c8b556032a871fd43a678d7dd3ed.jpg',
        role='admin'
    )
    demo = User(
        username ='Demo',
        email ='demo@aa.io',
        password ='password',
        profile_image_url = 'https://64.media.tumblr.com/0103e0a1d7aacd0038a15184b12c1d96/6a42cd1700c72e7f-50/s540x810/1799372488017d56fce50c3db13ba0215e936018.pnj',
        role='editor'
    )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password2',
        profile_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8L3CLG20ZPsyTPo9mQsD5ZOtnQuelLct1Q&usqp=CAU'
    )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password3',
        profile_image_url='https://pbs.twimg.com/media/FrAaUnZacAAxfLq.jpg'
    )
    db.session.add(owner)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
