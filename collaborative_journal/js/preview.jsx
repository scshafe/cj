import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JournalEntry from './journal_entry';
// import App from './app';

class Preview extends React.Component {
	constructor(props) {
		super(props);

		console.log(this.props);
		this.state = {
			title: ''
		};

		
	}

	componentDidMount() {
		fetch(this.props.api, {credentials: 'same-origin'})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	this.setState({
		  		title: data.title
		  	});
		  })
		  .catch(error => console.log(error));
	}



	render() {
		return (
			<div>
				<div className="entry_preview">
					<div>
						{this.props.entry_id}
					</div>
					<div>
						{this.state.title}
					</div>
					<div>
						<Link to={{
							pathname: `/journal_entry/${this.props.entry_id}`,
							state: {
								entry_id: this.props.entry_id
							}
						}}>View
						</Link>
					</div>
				</div>
			</div>);
	}
}

export default Preview;