import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Preview from './preview'
// import Entries from './entries';

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
								 method: 'DELETE'})
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
			<div>
				<div className="timeline_container">
					{this.state.entry_ids.map(je => (
						<div key={je} >
							<Preview api={`api/preview/${je}/`} entry_id={je} />


							<button onClick={this.handleDelete.bind(this, je)} >
								delete
							</button>
						</div>
						))}
				</div>

			</div>
			);
	}
}




export default Timeline;
