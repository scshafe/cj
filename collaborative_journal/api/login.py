
import collaborative_journal as cj

from flask import request, session, redirect, url_for, render_template, jsonify
from flask_login import current_user, login_user, logout_user
import json
from flask_wtf import csrf

from collaborative_journal.model.login import RegisterForm, LoginForm
from collaborative_journal.model.user import User
from collaborative_journal.model import db
from collaborative_journal import load_user
# from django.views.decorators.csrf import ensure_csrf_cookie



# @ensure_csrf_cookie
# @cj.app.route('/login/request', methods=['POST'])
# def login_request():
#     print("\nPOST LOGIN REQUEST\n")
#     data = json.loads(request.data)

#     print(data)
#     user = User.query.filter_by(username=data['username']).first()
#     login_user(user, remember=True)
#     return jsonify(**{'is_authenticated': True})





# @cj.app.route('/token', methods=['GET'])
# def token():

#     token = csrf.generate_csrf()
#     return jsonify(**{'token': token})



@cj.app.route('/login', methods=['POST', 'GET'])
def login():
    print(request.data)
    if request.method == 'GET':
        print("\nGET REQUEST\n")
        # context = {'token': csrf.generate_csrf()}
        context={}
        if current_user.is_authenticated:
            context['is_authenticated']= True
        else:
            context['is_authenticated']= False
        return render_template('index_dynamic.html', **context)
        
    if request.method == 'POST':
        data = json.loads(request.data)
        print(request)
        print(data)
        user = User.query.filter_by(username=data['username']).first()
        login_user(user, remember=True)
        return jsonify(**{'is_authenticated': True})


    # user = User.query.filter_by(username=form.username.data).first()
    # if user is None or not user.check_password(form.password.data):
    #     print(form.data)
    #     return jsonify(**{'is_authenticated': False})   
    # login_user(user, remember=True)
    # return jsonify(**{'is_authenticated': True})
    


@cj.app.route('/logout', methods=['GET', 'POST'])
def logout():
    logout_user()
    # return redirect(url_for('login'))
    token = csrf.generate_csrf()
    return jsonify(**{'is_authenticated': False, 'token': token})



