
from flask import request, render_template, session, redirect, url_for, jsonify
import collaborative_journal as cj
from collaborative_journal.queryStatements import getQuery
import sys
from flask_login import current_user
from collaborative_journal import load_user
from collaborative_journal.model.user import User
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
    posts_access = user.access_posts
    posts = user.own_posts
    print(user.timeline_posts())

    return jsonify(**{'entry_ids': user.timeline_posts()})
    



    


