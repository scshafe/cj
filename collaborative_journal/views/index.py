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

from flask_wtf import csrf

def getFile(full_filename):
    return open(full_filename, 'r').read()


def sha256sum(filename):
    """Return sha256 hash of file content, similar to UNIX sha256sum."""
    content = open(filename, 'rb').read()
    sha256_obj = hashlib.sha256(content)
    return sha256_obj.hexdigest()



@cj.app.route('/', methods=['GET'])
def show_timeline():

    context = {'token': csrf.generate_csrf()}
    return render_template('index_dynamic.html', **context)













