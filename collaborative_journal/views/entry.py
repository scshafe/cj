from flask import request, render_template, session, redirect, url_for
import collaborative_journal as cj
from collaborative_journal.queryStatements import getQuery
import sys
from flask_login import current_user
from collaborative_journal import load_user
from collaborative_journal.model.post import Post
from collaborative_journal.model import db
# from collaborative_journal.views.login import logout
import os
import hashlib
from tempfile import mkstemp
import shutil
from django.views.decorators.csrf import ensure_csrf_cookie



def getFile(full_filename):
    return open(full_filename, 'r').read()


def sha256sum(filename):
    """Return sha256 hash of file content, similar to UNIX sha256sum."""
    content = open(filename, 'rb').read()
    sha256_obj = hashlib.sha256(content)
    return sha256_obj.hexdigest()



# @cj.app.route('/new_entry', methods=['GET', 'POST'])
# def new_entry():

#     context = {}
#     # going to form to create new entry
#     if request.method == 'GET':
#         # create new post entry and put in checks to make sure save is consistent?
#         return render_template('edit_entry.html', title='New Entry', **context)
#     # submitting new entry
#     elif request.method == 'POST':
#         p = Post(title=request.form['title'], user_id=current_user.id)
#         dummy, temp_filename = mkstemp()
#         tempfile = open(temp_filename, 'w')
#         tempfile.write(request.form['journal_entry'])
#         tempfile.flush()
#         p.create_filename(sha256sum(temp_filename))   

#         shutil.move(temp_filename, p.get_full_filename())


#         db.session.add(p)
#         db.session.commit()
#         #update entry in database and return rendered single entry

#         # context['entry'] = {'title': p.title, 'journal_entry': p.get_relative_filename()}
#         return redirect(url_for('entry', postid=p.id))



# @cj.app.route('/entry/edit/<postid>/', methods=['GET', 'POST'])
# def edit_entry(postid):
#     context = {}
#     return render_template('practice.html', **context)

#     # verify_user()
#     context = {}
#     if request.method == 'GET':
#         p = Post.query.get(postid)
#         context = {}
#         context['entry'] = {'title': p.title, 'post_id': p.id, 'journal_entry': getFile(p.get_full_filename()) }
#         return render_template('edit_entry.html', **context)

#     elif request.method == 'POST':
#         p = Post.query.get(postid)
#         p.title = request.form['title']

#         f = open(p.get_full_filename(), 'w')
#         print(request.form['journal_entry'], file=f)
#         db.session.commit()

#         return redirect(url_for('entry', postid=postid))
        # return render_template('entry.html', **context)


 
# @cj.app.route('/entry/<postid>/', methods=['GET', 'POST', 'DELETE'])
# def entry(postid):
    

#     # handle a post vs handle a get
#     if request.method == 'POST':
#         return redirect(url_for('edit_entry', postid=postid))


#     p = Post.query.get(postid)
#     context = {}
#     context['entry'] = {'title': p.title, 'post_id': p.id, 'journal_entry': getFile(p.get_full_filename()) }

#     # if request.method == 'GET':
#     return render_template('entry.html', **context)




# @ensure_csrf_cookie
@cj.app.route('/', methods=['GET'])
def show_timeline():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))

    # user = load_user(current_user.get_id())
    # print('\n\n')
    # print(user)
    # print('\n\n')
    # posts = Post.query.filter_by(user_id=user.id)
    # print(posts)
    context = {}
    # context['entry_ids'] = []
    # for p in posts:
    #     context['entry_ids'].append(p.id)
        # context['entry_ids'].append({'title': p.title, 'post_id': p.id})
        # context['entries'].append({'title': p.title, 'post_id': p.id, 'journal_entry': p.get_full_filename()})

    # print(context)
    return render_template('index_dynamic.html', **context)
    # return flask.jsonify(**context), 200













