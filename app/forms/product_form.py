from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, DecimalField
from wtforms.validators import DataRequired, Length, URL, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(min=3, max=255, message="Product name must be between 3 and 255 characters!")])
    description = StringField("Descriptions", validators=[DataRequired(), Length(min=5, max=255, message="Product descriptions must be between 3 and 255 characters!")])
    price = DecimalField("Product Price", validators=[DataRequired(), NumberRange(min=0, message="Price must be a positive value")])
    # added_by_user_id = SelectField("User", choices=[])
    category_id = SelectField("Category", choices=[])
    submit = SubmitField("Save Product")
