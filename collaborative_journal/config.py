

import os

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'D\x1f4\xf4\xa2\x849"\xde 0\xe7\x03?\xd8(b\xdb\x13\xa1\xdc0\x80\x0e'  # noqa: E501  pylint: disable=line-too-long
SESSION_COOKIE_NAME = 'login'




# File Upload to var/uploads/
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'uploads'
)
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
# MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# Database file is var/insta485.sqlite3
# DATABASE_FILENAME = os.path.join(
#     os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
#     'var', 'collaborative_journal.sqlite3'
# )




# "sqlite:////var/collaborative_journal.sqlite3"
basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

# SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
#     os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
#     'var', 'collaborative_journal.sqlite3')

SQLALCHEMY_TRACK_MODIFICATIONS = True