import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Preview from './preview'
import {AuthConsumer} from './context';

import styles from '../css/timeline.css';


function Timeline (props) {

	const [entry_ids, set_entry_ids] = useState([]);

	useEffect(() => {
		fetch('/api/timeline/', {credentials: 'same-origin'})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
			set_entry_ids(data.entry_ids);
		  })
		  .catch(error => console.log(error));
	}, []);

	function handleDelete(event) {
		console.log(event.target);
		const je = event.target.attributes.je.value;
		fetch('/api/entry/'+je+'/', {credentials: 'same-origin',
								 method: 'DELETE',
								 headers: {
								 	"X-CSRFToken": event.target.attributes.token.value
								 }})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	if (data.successful_delete) {
		  		set_entry_ids(entry_ids.filter(function(entry_id) {
		  			return entry_id !== Number(je);
		  		}))
		  	}
		  	else {
		  		alert("failed delete");
		  	}
		  })
		  .catch(error => console.log(error));
	}

	return (
		<AuthConsumer>
		{({context_csrf_token}) => (
			<div>
				<div className={styles.timeline}>
					{entry_ids.map(je => (
						<div key={je} className={styles.preview}>
							<Preview api={`api/preview/${je}/`} entry_id={je} />

							<button onClick={handleDelete} je={je} token={context_csrf_token} className={styles.deleteButton} >
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

export default Timeline;




// class Timeline extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {entry_ids: []};

// 		this.handleDelete = this.handleDelete.bind(this);
// 	}

// 	componentDidMount() {
// 		fetch('/api/timeline/', {credentials: 'same-origin'})
// 		  .then((response) => {
// 		  	if (!response.ok) throw Error(response.statusText);
// 		  	return response.json();
// 		  })
// 		  .then((data) => {
// 		  	this.setState({
// 		  		entry_ids: data.entry_ids
// 		  	});
// 		  })
// 		  .catch(error => console.log(error));
// 	}

// 	handleDelete(je, e) {
// 		console.log(e);
// 		console.log(e.target);
// 		console.log(e.target.attributes);
// 		fetch(`/api/entry/${je}/`, {credentials: 'same-origin',
// 								 method: 'DELETE',
// 								 headers: {
// 								 	"X-CSRFToken": e.target.attributes.token.value
// 								 }})
// 		  .then((response) => {
// 		  	if (!response.ok) throw Error(response.statusText);
// 		  	return response.json();
// 		  })
// 		  .then((data) => {
// 		  	if (data.successful_delete) {
// 		  		this.setState({entry_ids: this.state.entry_ids.filter(function(entry_id) {
// 		  			return entry_id !== je
// 		  		})});
// 		  	}
// 		  })
// 		  .catch(error => console.log(error));
// 	}

// 	render() {
// 		return (
// 			<AuthConsumer>
// 			{({context_csrf_token}) => (
// 			<div>
// 				<div className="timeline_container">
// 					{this.state.entry_ids.map(je => (
// 						<div key={je} >
// 							<Preview api={`api/preview/${je}/`} entry_id={je} />

// 							<button onClick={this.handleDelete.bind(this, je)} token={context_csrf_token} >
// 								delete
// 							</button>
// 						</div>
// 						))}
// 				</div>
// 			</div>
// 			)}
// 			</AuthConsumer>
// 			);
// 	}	
// }


