
from flask import request, jsonify
import collaborative_journal as cj
import json

from flask_login import current_user
from collaborative_journal import load_user
# from collaborative_journal.model.post import Post
from collaborative_journal.model.user import User
from collaborative_journal.model import db
# from collaborative_journal.views.login import logout





# from sqlalchemy import inspect, update



@cj.app.route('/account', methods=['GET'])
def get_account_info():

    context = {}

    user = load_user(current_user.get_id())
    context['friends'] = [x.id for x in user.friends]
    print(context)
    return jsonify(**context)


@cj.app.route('/friend/info/<int:friend_id>/', methods=['GET'])
def get_friend(friend_id):

    # user = User.get(friend_id)
    print("Getting friend_id", friend_id)
    friend_list = load_user(current_user.get_id()).friends

    for friend in friend_list:
        if friend.id == friend_id:
            return jsonify(**{'friend_username': friend.username})

    return jsonify(**{}), 404

    # friend = User.query.get(friend_id)

    # print(friend)
    # context = {'friend_username': friend.username}
    # return jsonify(**context)



@cj.app.route('/account/new_friend', methods=['POST'])
def new_friend():
    print("\n\nAdding new friend")

    data = json.loads(request.data.decode('utf8'))
    print(data)
    user = load_user(current_user.get_id())

    friend = User.query.filter_by(username=data['friend_username']).first() # if 'friend_username' in data else load_user(data['friend_id'])
    print(user)
    print(friend)
    if friend:

# user = User(username=form.username.data)
        friends = Friendship(friend_a_id=user.id, friend_b_id=friend.id)
        # friends = Friendship(friend_a_id=user.id, friend_b_id=data['friend_id'])
        print(friends)
        db.session.add(friends)
        db.session.flush()
        db.session.commit()
        return jsonify(**{'added_friend': friend.id})
    else:
        return jsonify(**{}), 404

@cj.app.route('/account/delete_friend', methods=['POST'])
def delete_friend():

    print("deleting friend")



    user = load_user(current_user.get_id())
    data = json.loads(request.data.decode('utf8'))
    print(data)
    # friend = User.query.filter_by(username=data['friend_use']).first()

    friendship = Friendship.query.filter_by(friend_a_id=user.id, friend_b_id=data['friend_id']).first()
    # friendship = Friendship(friend_a_id=user.id, friend_b_id=data['friend_id'])
    print(friendship)
    db.session.delete(friendship)
    db.session.flush()
    db.session.commit()

    context = {"successful_delete": True}
    return jsonify(**context)









