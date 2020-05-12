
from flask import request, render_template, session, redirect, url_for, jsonify
import collaborative_journal as cj
from collaborative_journal.queryStatements import getQuery
import sys
from flask_login import current_user
from collaborative_journal import load_user
from collaborative_journal.model.post import Post
from collaborative_journal.model import db
from collaborative_journal.views.login import logout
import os
import hashlib
from tempfile import mkstemp
import shutil
import json
from sqlalchemy import inspect, update


debug_space='\n\n\n'


# API:
#  entry_id:
#  editor_state:
#  title:





def getFile(full_filename):
    return open(full_filename, 'r').read()


def sha256sum(filename):
    """Return sha256 hash of file content, similar to UNIX sha256sum."""
    content = open(filename, 'rb').read()
    sha256_obj = hashlib.sha256(content)
    return sha256_obj.hexdigest()


@cj.app.route('/api/entry/new/', methods=['GET'])
def new_entry():
    
    p = Post(user_id=current_user.get_id())
    db.session.add(p)
    db.session.flush()
    db.session.commit()

    print(p)
    print(p.id)
    
    # p = Post(title=et['entry_title'], user_id=current_user.get_id())

    # dummy, temp_filename = mkstemp()
    # tempfile = open(temp_filename, 'w')
    # # tempfile.write(json.dumps(et['entry']))
    # tempfile.flush()
    # p.create_filename(sha256sum(temp_filename))   
    # shutil.move(temp_filename, p.get_full_filename())

    # db.session.add(p)
    # db.session.commit()
    context = {}
    context['successful_save'] = True
    context['entry_id'] = p.id
    return jsonify(**context)


@cj.app.route('/api/entry/<int:entry_id>/', methods=['POST'])
def save_journal_entry(entry_id):

    save_data = json.loads(request.data.decode('utf8'))
    print('\n')
    print(save_data, end=debug_space)

    # sesh = db.Session()

    # sesh.execute(Post.update().where(Post.c.id==entry_id).values(title=save_data['entry_title']))
    p = Post.query.get(entry_id)
    p.title = save_data['title']
    p.save_post(save_data['editor_state'])

    db.session.commit()


    # p = Post.query.get(entry_id)

    # p.save_post(save_data['entry'])
    # if save_data['entry_title']:
        # p.title= save_data['entry_title']
    # tempfile = open(post.get_full_filename(), 'w')
    # tempfile.write(json.dumps(save_data['entry']))
    # tempfile.flush()
    # db.session.

    context = {}
    context['successful_save'] = True
    return jsonify(**context)






def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}



@cj.app.route('/api/entry/<int:entry_id>/', methods=['GET'])
def get_journal_entry(entry_id):

    post = Post.query.get(entry_id)
    context = {}
    print(post)
    context = object_as_dict(post)

    if post.has_file():
        context['editor_state'] = getFile(post.get_full_filename())

    print(context)
    return jsonify(**context)



@cj.app.route('/api/entry/<int:entry_id>/', methods=['DELETE'])
def delete_journal_entry(entry_id):

    print("deleting journal entry {}\n".format(entry_id))

    post = Post.query.get(entry_id)
    db.session.delete(post)
    db.session.flush()
    db.session.commit()

    context = {"successful_delete": True}
    return jsonify(**context)



