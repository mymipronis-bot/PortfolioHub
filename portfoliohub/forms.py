from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FileField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, Optional

class CreateProfileForm(FlaskForm):
    full_name = StringField('Full Name', validators=[DataRequired(message='Full name is required.'), Length(max=100)])
    bio = TextAreaField('Bio', validators=[Optional(), Length(max=500)])
    avatar = FileField('Avatar Image', validators=[Optional()])
    template = SelectField('Template', choices=[('minimal', 'Minimal'), ('colorful', 'Colorful'), ('dark-elegant', 'Dark Elegant')], default='minimal')
    default_theme = SelectField('Default Theme', choices=[('light', 'Light'), ('dark', 'Dark')], default='light')
    default_language = SelectField('Default Language', choices=[('fr', 'French'), ('en', 'English')], default='fr')
    submit = SubmitField('Create Portfolio')
