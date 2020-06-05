

from collaborative_journal.model import db
from collaborative_journal.model.post import Access, Post
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



class Followers(db.Model):
    # __tablename__='friendship'
    follower = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    followed = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)

# friendship = db.Table('friendship',
#     db.Column('friend_a_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
#     db.Column('friend_b_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
#     )




# Define User data-model
class User(UserMixin, db.Model):
    # __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    # User Authentication fields
    # email = db.Column(db.String(255), nullable=False, unique=True)
    # email_confirmed_at = db.Column(db.DateTime())
    username = db.Column(db.String(20), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    followers = db.relationship('User',
                                secondary=Followers.__tablename__,
                                primaryjoin=(Followers.followed==id),
                                secondaryjoin=(Followers.follower==id))

    following = db.relationship('User',
                                secondary=Followers.__tablename__,
                                primaryjoin=(Followers.follower==id),
                                secondaryjoin=(Followers.followed==id))


    access_posts = db.relationship('Post',
                                 secondary=Access.__tablename__,
                                 primaryjoin=(Access.user_id==id),
                                 secondaryjoin=(Access.post_id==Post.id),
                                 backref='accessors')

    own_posts = db.relationship('Post',
                                primaryjoin=(Post.user_id==id),
                                backref='owner')

    # view_posts = db.relationship('Post',
    #                              secondary=Access.__tablename__,
    #                              primaryjoin=(Access.user_id==id),
    #                              secondaryjoin=(Access.))

    # view_posts = own_posts


    # access = db.relationship('Access', secondary=A)



    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)










