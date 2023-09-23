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
        media_url='https://i5.walmartimages.com/asr/24fe50b3-17d7-42d9-b28f-bb90facea218.5b4443498690b33c9b6ea0977063e803.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',

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
        media_url='https://m.media-amazon.com/images/I/714V0dHQ7FL._AC_SL1500_.jpg',

    )

    #speed stack
    media13= Media(
        product_id=7,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/817CxBbK3PL._AC_SL1500_.jpg',

    )
    #Rubic Cube
    media14= Media(
        product_id=8,
        media_type='image',
        media_url='https://cdn.spinmasterstudios.com/products/rubiks/us/778988419533/full1.jpg',
    )

    media15= Media(
        product_id=8,
        media_type='image',
        media_url='https://cdn.spinmasterstudios.com/products/rubiks/us/778988419533/full2.jpg',
    )

    media16= Media(
        product_id=8,
        media_type='image',
        media_url='https://img.fantaskycdn.com/b8e2d57ac71debc776f9e5976b8e41fd_750x.jpeg',
    )

    #3D puzzles
    media16= Media(
        product_id=9,
        media_type='image',
        media_url='https://cdn.spinmasterstudios.com/products/rubiks/us/778988419533/full3.jpg',
    )

    media17= Media(
        product_id=9,
        media_type='image',
        media_url='https://img.staticdj.com/00fb62c5b6e9d673a2364cd9ddcc6687_1080x.jpeg',
    )

    #Blokus
    media18= Media(
        product_id=10,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/61Z3aiZqlYL._AC_SL1000_.jpg',
    )

    media19= Media(
        product_id=10,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/51xAczkCIjL._AC_.jpg',
    )
    #Black Pearl
    media20= Media(
        product_id=11,
        media_type='image',
        media_url='https://i.etsystatic.com/20300755/r/il/37c870/4336246912/il_794xN.4336246912_cifu.jpg',
    )

    media21= Media(
        product_id=11,
        media_type='image',
        media_url='https://i.etsystatic.com/20300755/r/il/abc664/4381651161/il_794xN.4381651161_i3qb.jpg',
    )

    media22= Media(
        product_id=11,
        media_type='image',
        media_url='https://i.etsystatic.com/20300755/r/il/4689da/4381651287/il_794xN.4381651287_orvc.jpg',
    )

    #Gundum
    media23= Media(
        product_id=12,
        media_type='image',
        media_url='https://p-bandai.com/img/us/p/m/N2519562001001_001.jpg',
    )

    media24= Media(
        product_id=12,
        media_type='image',
        media_url='https://p-bandai.com/img/us/p/m/N2519562001001_002.jpg',
    )

    media25= Media(
        product_id=12,
        media_type='image',
        media_url='https://p-bandai.com/img/us/p/m/N2519562001001_003.jpg',
    )

    #Keroro
    media26= Media(
        product_id=13,
        media_type='image',
        media_url='https://www.hlj.com/productimages/ban/bans57072_1.png',
    )

    media27= Media(
        product_id=13,
        media_type='image',
        media_url='https://www.hlj.com/productimages/ban/bans57072_2.png',
    )

    media28= Media(
        product_id=13,
        media_type='image',
        media_url='https://www.hlj.com/productimages/ban/bans57072_6.jpg',
    )

    #Batman
    media26= Media(
        product_id=14,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/61JiiG8eYvL._AC_SL1500_.jpg',
    )

    media27= Media(
        product_id=14,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/61YstDXchDL._AC_SL1500_.jpg',
    )

    media28= Media(
        product_id=14,
        media_type='image',
        media_url='https://m.media-amazon.com/images/I/71g-X76Xq-L._AC_SL1500_.jpg',
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
    db.session.add(media14)
    db.session.add(media15)
    db.session.add(media16)
    db.session.add(media17)
    db.session.add(media18)
    db.session.add(media19)
    db.session.add(media20)
    db.session.add(media21)
    db.session.add(media22)
    db.session.add(media23)
    db.session.add(media24)
    db.session.add(media25)
    db.session.add(media26)
    db.session.add(media27)
    db.session.add(media28)

    db.session.commit()

def undo_medias():
    if environment == "production":
        # db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.medias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medias"))
        # db.session.execute(text("DELETE FROM products"))

    db.session.commit()
