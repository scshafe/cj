import React, { useState, useEffect } from 'react';
import {AuthConsumer} from './context';


function ShowFriend({friend, api}) {

	const [username, set_username] = useState('');

	useEffect(() => {
		const id_val = parseInt({friend});
		console.log(friend);
		console.log(id_val);
		fetch(api, {credentials: 'same-origin'})
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			set_username(data.friend_username);
		})
	}, []);

	return(
			<div>
				{username}
			</div>
		);	
}


function Account(props) {

	const [username, set_username] = useState('');
	const [friends, set_friends] = useState([]);
	const [searchbar, set_searchbar] = useState('');

	useEffect(() => {
		fetch('/account', {credentials: 'same-origin'})
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			// for (var i = data.friends.length - 1; i >= 0; i--) {
			// 	set_friends(oldFriends =>)
			// 	data.friends[i]
			// }
			set_friends(data.friends);
			// set_friends(oldFriends => [...oldFriends, data.friends]);
			// set_friends([...oldFriends,])
			console.log("friends after initial load");
			console.log(friends);
		})
		.catch(error => console.log(error));
	}, []);

	function add_friend(event) {
		const {token} = event.target.attributes;
		const new_friend_id = parseInt(searchbar);
		const fetchData = {
	      credentials: 'same-origin',
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        "X-CSRFToken": token.value
	      },
	      body: JSON.stringify({ friend_username: searchbar})
	    };
	    fetch('/account/new_friend', fetchData)
	    .then((response) => {
	    	if (!response.ok) throw Error(response.statusText);
      		return response.json();
	    })
	    .then((data) => {
	    	console.log("friends before adding friend");
			console.log(friends);
			set_friends([...friends, data.added_friend]);
			console.log("friends after adding friend");
			console.log(friends);
		})
	    
	}

	function onFriendSearchChange(event) {
		set_searchbar(event.target.value);
	}


	function delete_friend(event) {
		const {friend, token} = event.target.attributes;
		const fetchData = {
	      credentials: 'same-origin',
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        "X-CSRFToken": token.value
	      },
	      body: JSON.stringify({ friend_id: Number(friend.value)})
	    };
		fetch('/account/delete_friend', fetchData)
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			if (data.successful_delete){
		    	set_friends(friends.filter(function(friend_id) {
		    		return friend_id != Number(friend.value);
		    	}));
	    	}
	    })
	    .catch(error => console.log(error));
	}


	return(
		<AuthConsumer>
			{({context_csrf_token}) => (
				<div>
				<div>
					<textarea value={searchbar} onChange={onFriendSearchChange} />
					<button onClick={add_friend} token={context_csrf_token}>Add Friend</button>
				</div>
				<div>
					{friends.length >= 1 ?
					friends.map(f => (
						<div key={f}>
							
							<div>
								<ShowFriend friend={f}  api={`friend/info/${f}/`} />
								<button onClick={delete_friend} friend={f} token={context_csrf_token} >delete</button>
							</div> 
							
						</div>))
					: 
					<div>Search for friends</div>}
				</div>
				</div>
		)}
		</AuthConsumer>
		);
	
}

export default Account;







