from flask import request

def getFile(filename):



def entry_post():
    pass
    #handle whatever post functionalities you want here


@cj.app.route('/entry/<postid>/', methods=['GET', 'POST'])
def journal_entry(postid):
    # handle a post vs handle a get
    verify_user()

    results = getQuery('getPost', (postid, session['user']))
    results["filename"] = collaborative_journal.config.UPLOAD_FOLDER + results["filename"]
    context = {}
    context['post'] = results
    return render_template('show_entry', **context)



@cj.app.route('/timeline', methods=['GET'])
def get_entries():
    verify_user()

    page = request.args.get('page', default=0, type=int)
    size = 5
    if 'size' in request.args:
        size = request.args.get('size', type=int)

    offset = page * size
    context = {}
    context['posts'] = []
    results = getQuery('getPosts', (session['user'], size, offset))
    for result in results:
        result['filename'] = collaborative_journal.config.UPLOAD_FOLDER + result["filename"]
        context['posts'].append(result)
    return flask.jsonify(**context), 200

