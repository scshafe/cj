
from flask import request, render_template, session, redirect, url_for, jsonify
import collaborative_journal as cj
from collaborative_journal.queryStatements import getQuery
import sys
from flask_login import current_user
from collaborative_journal import load_user
from collaborative_journal.model.post import Post
from collaborative_journal.model import db
import os
import hashlib
from tempfile import mkstemp
import shutil
import json

def getFile(full_filename):
    return open(full_filename, 'r').read()


def sha256sum(filename):
    """Return sha256 hash of file content, similar to UNIX sha256sum."""
    content = open(filename, 'rb').read()
    sha256_obj = hashlib.sha256(content)
    return sha256_obj.hexdigest()


# @cj.app.route('/api/entry/new/', methods=['GET', 'POST'])
# def new_entry():
#     if request.method == 'GET':
#         context = {}
#         context['entry_title'] = 'testcomponentdidmount'
#         context['url'] = '/api/entry/'
#         print("checkpoint")
#         return jsonify(**context), 201

#     et = json.loads(request.data.decode('utf8'))
#     print(et)
#     p = Post(title=et['entry_title'], user_id=current_user.get_id())

#     dummy, temp_filename = mkstemp()
#     tempfile = open(temp_filename, 'w')
#     tempfile.write(json.dumps(et['entry']))
#     tempfile.flush()
#     p.create_filename(sha256sum(temp_filename))   
#     shutil.move(temp_filename, p.get_full_filename())

#     db.session.add(p)
#     db.session.commit()
#     context = {}
#     context['successful_save'] = True
#     return jsonify(**context)

    # return redirect(url_for('show_timeline'))
    # return flask.jsonify(**context), 200

# @cj.app.route('/api/entry/<int:entry_id>/', methods=['GET', 'POST', 'DELETE'])
# def entry():
#     if request.method == 'GET':
#         p = Post.query.get(entry_id)

#         context['entry_title': p.title, 'entry_content': getFile(p.get_full_filename())]
#         return jsonify(**context)
#     print("post method not yet implemented")
#     return jsonify(**{})


# @cj.app.route('/api/entry/<int:entry_id>/edit/', methods=['GET', 'POST', 'DELETE'])
# def edit_entry():
#     if request.method == 'GET':
#         p = Post.query.get(entry_id)
#         context['entry_title': p.title, 'entry_content': getFile(p.get_full_filename())]
#         return jsonify(**context)
#         return render_template('practice.html', **context)







@cj.app.route('/api/preview/<int:entry_id>/', methods=['GET'])
def get_preview(entry_id):

    # posts = Post.query.filter_by(id=entry_id)
    post = Post.query.get(entry_id)
    context = {}

    context['title'] = post.title
    return jsonify(**context)

    return None




@cj.app.route('/api/timeline/', methods=['GET'])
def get_timeline():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))

    user = load_user(current_user.get_id())
    print('\n\n')
    print(user)
    print('\n\n')
    posts = Post.query.filter_by(user_id=user.id)
    print(posts)
    context = {}
    context['entry_ids'] = []
    for p in posts:
        context['entry_ids'].append(p.id)
    print(context)
    return jsonify(**context)



    


