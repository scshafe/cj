


from flask import request, render_template, session, redirect, url_for, jsonify
import collaborative_journal as cj
from collaborative_journal.queryStatements import getQuery
import sys
from flask_login import current_user
from collaborative_journal import load_user
from collaborative_journal.model.post import Access, Comment, Post
from collaborative_journal.model.user import User
from collaborative_journal.model import db

import os
import hashlib
from tempfile import mkstemp
import shutil
import json
from sqlalchemy import inspect, update


def getFile(full_filename):
    return open(full_filename, 'r').read()


def sha256sum(filename):
    """Return sha256 hash of file content, similar to UNIX sha256sum."""
    content = open(filename, 'rb').read()
    sha256_obj = hashlib.sha256(content)
    return sha256_obj.hexdigest()



@cj.app.route('/api/entry/<int:entry_id>/comments/', methods=['GET'])
def get_post_comments(entry_id):

    post = Post.query.get(entry_id)
    print(post)
    print("comment ids: ", [x.id for x in post.comments])
    return jsonify(**{'comments': [x.id for x in post.comments]})


@cj.app.route('/api/comment/<int:comment_id>/', methods=['GET'])
def get_comment(comment_id):

    comment = Comment.query.get(comment_id)
    return jsonify(**{'editor_state': getFile(comment.get_full_filename())})

    # getFile(post.get_full_filename())



# save_data:
#     editor_state
#     entry_id (int)
#     new_comment (boolean)
#     comment_id (if not new)
#     shared (boolean)


@cj.app.route('/api/entry/comment/', methods=['POST'])
def save_comment():

    save_data = json.loads(request.data.decode('utf8'))

    comment = Comment(post_id=save_data['entry_id'], user_id=current_user.get_id()) if save_data['new_comment'] else Comment.query.get(save_data['comment_id'])
    comment.shared = save_data['shared']

    comment.save_post(save_data['editor_state'])
    db.session.add(comment)
    db.session.commit()

    context = {}
    context['successful_save'] = True
    return jsonify(**context)






@cj.app.route('/api/entry/delete_comment/', methods=['DELETE'])
def delete_comment():

    save_data = json.loads(request.data.decode('utf8'))

    comment = Comment.query.get(save_data['comment_id'])
    comment.delete_file()
    db.session.delete(comment)
    db.session.flush()
    db.session.commit()
    return jsonify(**{"successful_delete": True})
    # comment = Comment.query.get()
    


    

