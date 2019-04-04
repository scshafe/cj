

import flask
import collaborative_journaling as cj


@cj.route('/')
def show_timeline():

    # if 'user' not in flask.session:
    #     flask.abort(403)

    # logname = flask.session('user')


    connection = cj.model.db()
    cur = connection.execute("SELECT * FROM posts")

    context = cur.fetchall()
    print(context)

    return flask.abort(404)


