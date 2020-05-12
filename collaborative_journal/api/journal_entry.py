
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
from sqlalchemy import inspect



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
    print(save_data)

    post = Post.query.get(entry_id)


    tempfile = open(post.get_full_filename(), 'w')
    tempfile.write(json.dumps(save_data['entry']))
    tempfile.flush()

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

    return jsonify(**object_as_dict(post))


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



