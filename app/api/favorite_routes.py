from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Favorite, Product

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/my-favorites')
@login_required
def view_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_products = [favorite.product.to_dict() for favorite in favorites]
    return jsonify(favorite_products)

@favorite_routes.route('/is-favorite/<int:product_id>', methods=['GET'])
@login_required
def is_favorite(product_id):
    '''Check if the product is favorited by the current user'''
    is_favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    return jsonify({"is_favorite": bool(is_favorite)})

@favorite_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def add_favorite(product_id):
    '''Check if the product is already favorited'''
    is_favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if is_favorite:
        favorites = Favorite.query.filter_by(user_id=current_user.id).all()
        favorite_products = [favorite.product.to_dict() for favorite in favorites]
        return jsonify(favorites=favorite_products, message="Product is already in favorites!"), 400

    favorite = Favorite(user_id=current_user.id, product_id=product_id)
    db.session.add(favorite)
    db.session.commit()
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_products = [favorite.product.to_dict() for favorite in favorites]
    return jsonify(favorites=favorite_products, message="Product added to favorites!"), 200


@favorite_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_favorite(product_id):
    '''Check if the product not found in favorites'''
    favorite = Favorite.query.filter_by(user_id=current_user.id, product_id=product_id).first()

    if not favorite:
        favorites = Favorite.query.filter_by(user_id=current_user.id).all()
        favorite_products = [favorite.product.to_dict() for favorite in favorites]
        return jsonify(favorites=favorite_products, message="Product not found in favorites!"), 404

    db.session.delete(favorite)
    db.session.commit()
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_products = [favorite.product.to_dict() for favorite in favorites]
    return jsonify(favorites=favorite_products, message="Product removed from favorites!"), 200
