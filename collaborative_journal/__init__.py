

import flask

app = flask.Flask(__name__)

# Read settings from config module (insta485/config.py)
app.config.from_object('collaborative_journaling.config')

# Overlay settings read from file specified by environment variable. This is
# useful for using different on development and production machines.
# Reference: http://flask.pocoo.org/docs/0.12/config/
app.config.from_envvar('collaborative_journaling_SETTINGS', silent=True)

# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/0.12/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import collaborative_journaling.api  # noqa: E402 pylint: disable=wrong-import-position
import collaborative_journaling.views  # noqa: E402  pylint: disable=wrong-import-position
import collaborative_journaling.model  # noqa: E402  pylint: disable=wrong-import-position