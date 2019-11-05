

from collaborative_journal.model import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



# Define User data-model
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    # User Authentication fields
    # email = db.Column(db.String(255), nullable=False, unique=True)
    # email_confirmed_at = db.Column(db.DateTime())
    username = db.Column(db.String(20), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


