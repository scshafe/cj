

from collaborative_journal.model import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



class Friendship(db.Model):
    __tablename__='friendship'
    friend_a_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    friend_b_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)




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

    friends = db.relationship('User', secondary=Friendship.__tablename__,
                              primaryjoin=id==Friendship.friend_a_id,
                              secondaryjoin=id==Friendship.friend_b_id)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)









# class User(Base):
#     __tablename__ = 'users'

#     id = Column(Integer, primary_key=True)
#     name = Column(String)

#     # this relationship is used for persistence
#     friends = relationship("User", secondary=friendship, 
#                            primaryjoin=id==friendship.c.friend_a_id,
#                            secondaryjoin=id==friendship.c.friend_b_id,
#     )

#     def __repr__(self):
#         return "User(%r)" % self.name

# # this relationship is viewonly and selects across the union of all
# # friends
# friendship_union = select([
#                         friendship.c.friend_a_id, 
#                         friendship.c.friend_b_id
#                         ]).union(
#                             select([
#                                 friendship.c.friend_b_id, 
#                                 friendship.c.friend_a_id]
#                             )
#                     ).alias()
# User.all_friends = relationship('User',
#                        secondary=friendship_union,
#                        primaryjoin=User.id==friendship_union.c.friend_a_id,
#                        secondaryjoin=User.id==friendship_union.c.friend_b_id,
#                        viewonly=True) 

