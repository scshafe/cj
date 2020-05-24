import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Preview from './preview'
// import Entries from './entries';
import {AuthConsumer} from './context';

class Timeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {entry_ids: []};

		// this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		fetch('/api/timeline/', {credentials: 'same-origin'})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	this.setState({
		  		entry_ids: data.entry_ids
		  	});
		  })
		  .catch(error => console.log(error));
	}

	handleDelete(je, e) {
		fetch(`/api/entry/${je}/`, {credentials: 'same-origin',
								 method: 'DELETE',
								 headers: {
								 	"X-CSRFToken": e.target.attributes.token.value
								 }})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	// this.setState({
		  	// 	entry_ids: data.entry_ids
		  	// });
		  	if (data.successful_delete) {
		  		this.setState({entry_ids: this.state.entry_ids.filter(function(entry_id) {
		  			return entry_id !== je
		  		})});
		  	}
		  })
		  .catch(error => console.log(error));
	}

	render() {
		return (
			<AuthConsumer>
			{({context_csrf_token}) => (
			<div>
				<div className="timeline_container">
					{this.state.entry_ids.map(je => (
						<div key={je} >
							<Preview api={`api/preview/${je}/`} entry_id={je} />


							<button onClick={this.handleDelete.bind(this, je)} token={context_csrf_token} >
								delete
							</button>
						</div>
						))}
				</div>

			</div>
			)}
			</AuthConsumer>
			);
	}
}




export default Timeline;
