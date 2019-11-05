
import os
import sys


import flask
from flask_migrate import Migrate
app = flask.Flask(__name__)

app.config.from_object('collaborative_journal.config')

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
#     os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
#     'var', 'collaborative_journal.sqlite3')
print(app.config["SQLALCHEMY_DATABASE_URI"],file=sys.stderr)

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from collaborative_journal.model import db, login_manager
db.init_app(app)
migrate = Migrate(app, db)
login_manager.init_app(app)

from collaborative_journal.model.user import User
from collaborative_journal.model.post import Post

@login_manager.user_loader
def load_user(user_id):
    # if user_id == None:
        # return flask.redirect(flask.url_for('login'))
    return User.query.get(int(user_id))

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Post': Post}




# Overlay settings read from file specified by environment variable. This is
# useful for using different on development and production machines.
# Reference: http://flask.pocoo.org/docs/0.12/config/
app.config.from_envvar('CJ_SETTINGS', silent=True)

# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/0.12/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.

import collaborative_journal.api 
import collaborative_journal.views
