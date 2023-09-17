from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ReviewForm(FlaskForm):
    review_text = TextAreaField("Review Text", validators=[Length(min=3, max=1000, message="Review text must be between 3 and 1000 characters!")])
    rating = IntegerField("Rating", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5!")])
    media_file = FileField("Image File", validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit Review")
