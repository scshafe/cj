import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JournalEntry from './journal_entry';
// import App from './app';


import styles from '../css/preview.css';

function Preview(props) {
	const [title, set_title] = useState('');
		console.log(props);
		// this.state = {
		// 	title: ''
		// };	

	useEffect(() => {
		fetch(props.api, {credentials: 'same-origin'})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	set_title(data.title);
		  })
		  .catch(error => console.log(error));
	}, []);

	

	return (
		<div>
			<div>
				{title}
			</div>
			<div>
				<Link to={{
					pathname: `/journal_entry/${props.entry_id}`,
					state: {
						is_new_entry: false,
						entry_id: props.entry_id,
						title: title
					}
				}}>View
				</Link>
			</div>
		</div>);

}

export default Preview;




// class Preview extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		console.log(this.props);
// 		this.state = {
// 			title: ''
// 		};	
// 	}

// 	componentDidMount() {
// 		fetch(this.props.api, {credentials: 'same-origin'})
// 		  .then((response) => {
// 		  	if (!response.ok) throw Error(response.statusText);
// 		  	return response.json();
// 		  })
// 		  .then((data) => {
// 		  	this.setState({
// 		  		title: data.title
// 		  	});
// 		  })
// 		  .catch(error => console.log(error));
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<div className="entry_preview">
// 					<div>
// 						{this.props.entry_id}
// 					</div>
// 					<div>
// 						{this.state.title}
// 					</div>
// 					<div>
// 						<Link to={{
// 							pathname: `/journal_entry/${this.props.entry_id}`,
// 							state: {
// 								is_new_entry: false,
// 								entry_id: this.props.entry_id,
// 								title: this.state.title
// 							}
// 						}}>View
// 						</Link>
// 					</div>
// 				</div>
// 			</div>);
// 	}
// }