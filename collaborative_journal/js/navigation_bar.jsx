import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import JournalEntry from './journal_entry';
import {AuthConsumer} from './context';




function NavBar (props) {
	
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

			<Link to={{pathname: '/account'}}>
				<button>Account</button>
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

export default NavBar;


