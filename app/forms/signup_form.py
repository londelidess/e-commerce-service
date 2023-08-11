from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..models import User
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
import re

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def is_valid_email(form, field):
    email_regex = re.compile(r"[^@]+@[^@]+\.[^@]+")
    if not email_regex.match(field.data):
        raise ValidationError("Invalid email format.")

class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    # email = StringField('email', validators=[DataRequired(), user_exists])
    # password = StringField('password', validators=[DataRequired()])
    username = StringField(
        'Username',
        validators=[
            DataRequired(),
            Length(min=3, max=30, message="Username must be between 3 to 30 characters"),
            username_exists
        ]
    )

    email = StringField(
        'Email',
        validators=[
            DataRequired(),
            Email(message="Invalid email structure"),
            Length(min=3, max=100),
            user_exists,
            is_valid_email
        ]
    )

    password = PasswordField(
        'Password',
        validators=[
            DataRequired(),
            Length(min=8, max=30, message="Password must be at least 8 characters")
        ]
    )

    confirm_password = PasswordField(
        'Confirm Password',
        validators=[
            DataRequired(),
            EqualTo('password', message="Passwords must match")
        ]
        )

    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
