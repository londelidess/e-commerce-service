from app.models import db, Media, environment, SCHEMA
from sqlalchemy.sql import text


def seed_medias():
    media1 = Media(
        product_id=1,
        media_type='image',
        media_url='https://cf.geekdo-images.com/1ph2jVOD1MudR1fK1nkwwA__imagepage/img/fJnH-EaribcvbLOrgud8-ymshWM=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2031446.png',

    )
    media2 = Media(
        product_id=1,
        media_type='image',
        media_url='https://cf.geekdo-images.com/oHDDdWj3Wome0lO7um2Eog__imagepage/img/_UwL40ShgheaFusDMyOOkVhf6oQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2087147.jpg',

    )
    media3 = Media(
        product_id=2,
        media_type='image',
        media_url='https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fi3tc75gzxqq91.jpg',

    )
    #Pokemon Jigsaw Puzzlen
    media4 = Media(
        product_id=3,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/91lwUBmpTHL._AC_SL1500_.jpg',

    )
    media5 = Media(
        product_id=3,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/81JRSiOYKGL._AC_SL1500_.jpg',

    )
    media6= Media(
        product_id=3,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/81kUbmv5+CL._AC_SL1500_.jpg',

    )
    #Mini4wd 4
    media7= Media(
        product_id=4,
        media_type='image',
        media_url='https://www.tamiyausa.com/media/CACHE/images/products/jr-beat-magnum-premium-ar-chassis-1-edd1/d98c4f5759b2fe799f1c4f985ab2df98.jpg',

    )
    #Jenga
    media8= Media(
        product_id=5,
        media_type='image',
        media_url='https://target.scene7.com/is/image/Target/GUEST_2ff3e3eb-c38d-4c5a-a6bc-7b95b96c3fec?wid=1000&hei=1000&fit=constrain&qlt=80&fmt=webp',

    )
    media9= Media(
        product_id=5,
        media_type='image',
        media_url='https://target.scene7.com/is/image/Target/GUEST_3487e4c0-d17f-4428-90e7-e378ab2850c7?wid=1000&hei=1000&fit=constrain&qlt=80&fmt=webp',

    )
    #Avocado
    media10= Media(
        product_id=6,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/61swACMaT-L._AC_SL1000_.jpg',

    )

    media11= Media(
        product_id=6,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/719AcDa8kqL._AC_SL1500_.jpg',

    )
    media12= Media(
        product_id=6,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/61swACMaT-L._AC_SL1000_.jpg',

    )

    #speed stack
    media13= Media(
        product_id=7,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/817CxBbK3PL._AC_SL1500_.jpg',

    )

    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.add(media5)
    db.session.add(media6)
    db.session.add(media7)
    db.session.add(media8)
    db.session.add(media9)
    db.session.add(media10)
    db.session.add(media11)
    db.session.add(media12)
    db.session.add(media13)





    db.session.commit()

def undo_medias():
    if environment == "production":
        # db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.medias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medias"))
        # db.session.execute(text("DELETE FROM products"))

    db.session.commit()
