from flask import Blueprint, request, jsonify
from ..models import Media, Product, Review, db
from flask_login import login_required
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3, ALLOWED_EXTENSIONS
from ..forms import MediaForm
from .auth_routes import validation_errors_to_error_messages
from flask import current_app as app

media_routes = Blueprint("medias", __name__)

@media_routes.route("/<int:owner_id>", methods=["POST"])
@login_required
def add_media(owner_id):
  '''
  add a media to a product or media
  '''
  form = MediaForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  product = Product.query.get(product_id)
  if not product:
    return {"error": "Product not found!"}, 404
  # img = request.files.get('media_file')
  # print(img)
  valid_owner_types = ["product", "review"]

  # print(form.validate_on_submit())
  # print(form.data["media_file"])
  if form.validate_on_submit():
    image = form.data["media_file"]

    image.filename = get_unique_filename(image.filename)
    print(image)
    upload = upload_file_to_s3(image)
    print(upload)
    if "url" not in upload:
      return {"error": "upload failed!"}

    if upload["url"].endswith("mp4"):
      media_type = "video"
    elif upload["url"].endswith("gif"):
      media_type = "gif"
    else:
      media_type = "image"

    new_media = Media(
      product_id=product_id,
      media_type=media_type,
      media_url=upload["url"]
      )

    db.session.add(new_media)
    db.session.commit()
    return {"Media": new_media.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@media_routes.route("/<int:owner_id>", methods=["DELETE"])
@login_required
def delete_media(owner_id):
  """delete a media"""
  media_to_delete = Media.query.get(owner_id)
  file_delete = remove_file_from_s3(media_to_delete.media_url)
  if file_delete is True:
    db.session.delete(media_to_delete)
    db.session.commit()
    return {"message": "Successfully deleted!"}
  return {"message": "deletion failed"}
