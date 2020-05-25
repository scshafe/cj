import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import JournalEntry from './journal_entry';
import {AuthConsumer} from './context';
// import App from './app';
// import { useHistory } from "react-router-dom";

class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {redirect: null,
					  entry_id: null}

		this.handleNewEntry = this.handleNewEntry.bind(this);
	}

	handleNewEntry() {
		fetch('/api/entry/new/', {credentials: 'same-origin'})
		 .then((response) => {
		 	if (!response.ok) {
		 		throw Error(response.statusText);
		 		alert("Could not open new entry.");
		 	}
		 	else {
		 		return response.json();
		 	} 	
		 })
		 .then((data) => {
		 	console.log(data.entry_id);
		 	this.setState({redirect: true, entry_id: data.entry_id});
		 })
		 .catch(error => console.log(error));
	}

	render() {
		return (
			<AuthConsumer>
			{({isAuth, logout, context_csrf_token}) => (
				isAuth ?
			<div>
				<Link to={{ pathname: "/journal_entry/:entry_id", state: { is_new_entry: true } }}>
					<button>New Entry</button>
				</Link>
				
				<Link to={{ pathname: '/'}} >
					<button>Timeline</button>
				</Link>
				
				<Link to={{pathname: '/login'}}>
					<button onClick={logout} token={context_csrf_token}>Log Out.</button>
				</Link>
			</div>
			: <Link to={{pathname: '/login'}}>
				<button>
					Log In.
				</button>
				</Link>)}
			</AuthConsumer>
			);
	}
}

export default NavBar;


