from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, db, Category, Review
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3, ALLOWED_EXTENSIONS
from ..forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from flask import current_app as app

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/user/<int:user_id>', methods=['GET'])
@login_required
def view_user_reviews(user_id):
    """View reviews for a specific user."""
    if user_id != current_user.id:
        return jsonify({'errors': 'Not authorized to view these reviews'}), 403

    reviews = Review.query.filter_by(user_id=user_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200


@review_routes.route('/<int:product_id>', methods=['GET'])
def view_product_reviews(product_id):
    """View reviews for a specific product."""
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

@review_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def post_review(product_id):
    """Post a new review for a product."""
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        media_url = None
        if form.media_file.data:
            file = form.data["media_file"]
            file.filename = get_unique_filename(file.filename)
            upload = upload_file_to_s3(file)
            media_url = upload.get("url")
            print(media_url)

        review = Review(
            product_id=product_id,
            user_id=current_user.id,
            review_text=form.data['review_text'],
            rating=form.data['rating'],
            media_url=media_url
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    """Edit an existing review."""
    review = Review.query.get(review_id)

    if not review:
        return jsonify({'errors': 'Review not found'}), 404

    if review.user_id != current_user.id:
        return jsonify({'errors': 'Not authorized to edit this review'}), 403

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if review.media_url and form.media_file.data:
            remove_file_from_s3(review.media_url)

            file = form.data["media_file"]
            file.filename = get_unique_filename(file.filename)
            upload = upload_file_to_s3(file)
            review.media_url = upload.get("url")

        elif not review.media_url and form.media_file.data:
            file = form.data["media_file"]
            file.filename = get_unique_filename(file.filename)
            upload = upload_file_to_s3(file)
            review.media_url = upload.get("url")

        review.review_text = form.data['review_text']
        review.rating = form.data['rating']

        db.session.commit()
        return jsonify(review.to_dict()), 200

    return jsonify({'errors': form.errors}), 400

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """Delete a review."""
    review_to_delete = Review.query.get(review_id)

    if not review_to_delete:
        return jsonify({'errors': 'Review not found'}), 404

    if review_to_delete.user_id != current_user.id:
        return jsonify({'errors': 'Not authorized to delete this review'}), 403

    if review_to_delete.media_url:
        file_delete = remove_file_from_s3(review_to_delete.media_url)
        if not file_delete:
            return jsonify({'errors': 'Media deletion from AWS failed'}), 500

    db.session.delete(review_to_delete)
    db.session.commit()
    return jsonify({'message': 'Review successfully deleted!'}), 200
