
import collaborative_journal as cj
from flask import request, session, redirect, url_for, render_template



@cj.app.route('/accounts/login/', methods=['GET', 'POST'])
def show_login():
    """Display /accounts/login/ route."""
    if request.method == 'POST':
        if valid_credentials(request.form['username'],
                             request.form['password']):
            session['user'] = request.form['username']
            return redirect(url_for('show_index'))
    context = {}
    return render_template("login.html", **context)


def valid_session():

    # check if [cookie,user] combination is valid, return to login page otherwise
    return True


def valid_credentials(username, password):

    # check if legitimate [username,password] combination
    return True

def verify_user():
    if 'user' in session:
        return
    else if request.method == 'POST':
        abort(403);
    else:
        return redirect(url_for('show_login'))
