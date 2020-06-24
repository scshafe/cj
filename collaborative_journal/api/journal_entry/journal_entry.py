
from flask import request, render_template, session, redirect, url_for, jsonify
import collaborative_journal as cj
from collaborative_journal.queryStatements import getQuery
import sys
from flask_login import current_user
from collaborative_journal import load_user
from collaborative_journal.model.post import Access, Post
from collaborative_journal.model.user import User
from collaborative_journal.model import db
# from collaborative_journal.views.login import logout
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



@cj.app.route('/api/entry/save/', methods=['POST'])
def save_journal_entry():

    save_data = json.loads(request.data.decode('utf8'))
    print('\n')
    print(save_data, end=debug_space)

    user = load_user(current_user.get_id())
    p = Post(user_id=user.id) if save_data['new_entry'] else Post.query.get(save_data['entry_id'])
    
    if p.user_id != user.id: # make sure only post owner is editting it
        return jsonify(**{'successful_save': False})

    p.title = save_data['title']
    p.save_post(save_data['editor_state'])
    db.session.add(p)
    db.session.commit()

    context = {}
    context['successful_save'] = True
    context['entry_id'] = p.id
    print(context)
    return jsonify(**context)



def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}



@cj.app.route('/api/entry/<int:entry_id>/', methods=['GET'])
def get_journal_entry(entry_id):

    post = Post.query.get(entry_id)
    context = {}
    print(post)
    context = {'id': post.id, 'title': post.title}

    if post.has_file():
        context['editor_state'] = getFile(post.get_full_filename())

    print(context)
    return jsonify(**context)



@cj.app.route('/api/entry/<int:entry_id>/', methods=['DELETE'])
def delete_journal_entry(entry_id):

    print("deleting journal entry {}\n".format(entry_id))

    post = Post.query.get(entry_id)

    user = load_user(current_user.get_id())
    if post.user_id != user.id: # make sure only post owner is editting it
        print("post id", post.id)
        print("post user id", post.user_id, type(post.user_id))
        print("current user id", current_user.get_id(), type(current_user.get_id()))
        return jsonify(**{'successful_delete': False})
    post.delete_file()        
    db.session.delete(post)
    db.session.flush()
    db.session.commit()

    context = {"successful_delete": True}
    return jsonify(**context)


@cj.app.route('/api/entry/share_entry/', methods=['POST'])
def share_journal_entry():

    share_data = json.loads(request.data.decode('utf8'))

    user = load_user(current_user.get_id())
    friend = User.query.filter_by(username=share_data['sharingName']).first()
    post = Post.query.get(share_data['post_id'])

    if friend in user.friends:
        print("is friend")
        friend.access_posts.append(post)
        db.session.add(friend)
        db.session.commit()
        context = {"successful_add": True}
        return jsonify(**context)
    else:
        return jsonify(**{}), 404



@cj.app.route('/api/entry/<int:entry_id>/get_access_list/', methods=['GET'])
def get_entry_access_list(entry_id):

    # user = load_user(current_user.get)
    post = Post.query.filter_by(id=entry_id).first()

    accessing_info = Access.query.all()
    print(accessing_info)
    print([x.username for x in post.accessors])

    return jsonify(**{'access_list': [x.username for x in post.accessors]})


@cj.app.route('/api/entry/delete_share/', methods=['DELETE'])
def delete_entry_access_share():

    share_data = json.loads(request.data.decode('utf8'))
    print(share_data)

    user = load_user(current_user.get_id())
    post = Post.query.get(share_data['post_id'])

    if post.user_id == user.id:
        friend = User.query.filter_by(username=share_data['sharingName']).first()

        if friend in user.friends:
            if friend in post.accessors:
                post.accessors.remove(friend)
                db.session.add(post)
                db.session.commit()
                return jsonify(**{"successful_share_delete": True})


    return jsonify(**{"successful_share_delete": False})












