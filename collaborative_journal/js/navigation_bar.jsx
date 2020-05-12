import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JournalEntry from './journal_entry';
// import App from './app';
// import { useHistory } from "react-router-dom";

class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.handleNewEntry = this.handleNewEntry.bind(this);
	}

	// componentDidMount() {

	// }

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
		 	// let history = useHistory();
		 	// this.props.history.push(`/journal_entry/${data.entry_id}`);
		 	// this.context.history.push(`/journal_entry/${data.entry_id}`);
		 	// make sure redirect to new entry occurs

		 })
		 .catch(error => console.log(error));
	}

	render() {
		return (
			<div>
				<button id="newentry" type="button" onClick={this.handleNewEntry}>New Entry</button>
			</div>
			);
	}

}

export default NavBar;