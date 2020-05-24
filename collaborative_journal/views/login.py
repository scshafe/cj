
import collaborative_journal as cj

from flask import request, session, redirect, url_for, render_template
from flask_login import current_user, login_user, logout_user

from collaborative_journal.model.login import RegisterForm, LoginForm
from collaborative_journal.model.user import User
from collaborative_journal.model import db
from collaborative_journal import load_user



# @cj.app.route('/login', methods=['GET', 'POST'])
# def login():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
#     form = LoginForm()
#     print(form.username.data)

#     print(form.password)
#     print(form.password.data)
#     if form.validate_on_submit():
#         print("validate passing")
#         user = User.query.filter_by(username=form.username.data).first()
#         print(user)
#         if user is None or not user.check_password(form.password.data):
#             # flash('Invalid username or password')
#             return redirect(url_for('login'))
#         # print(user.username)
#         login_user(user, remember=False)
#         return redirect(url_for('show_timeline'))
#     return render_template('login.html', title='Sign In', form=form)
#     # return render_template('login.html')


# @cj.app.route('/logout', methods=['GET', 'POST'])
# def logout():
#     logout_user()
#     return redirect(url_for('login'))





@cj.app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        # flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


