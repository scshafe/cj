

import flask
import collaborative_journaling as cj


@cj.route('/api/v1/entries/')
def show_entries():

    # logname = flask.session('user')
    # if 'user' not in flask.session:
    #     flask.abort(403)
    context = {}
    context["next"] = ""
    context["url"] = flask.request.path
    page = request.args.get('page', default=0, type=int)
    size = request.args.get('size', default=10, type=int)

    results = cj.queryStatements.getQuery("getPosts", user_id)

    context["posts"] = []
    for result in results:
        url = flask.request.path + result["postid"]
        context["posts"].append({"postid": result["postid"], "url": url})
    print(context)

    return flask.jsonify(**context), 201

    return flask.abort(404)






# @cj.route('/api/v1/entries/')


    


