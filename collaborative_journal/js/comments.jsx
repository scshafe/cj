import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {AuthConsumer} from './context';
import Comment from './comment';
import NewComment from './new_comment';

function Comments(props) {

	const entry_id = props.entry_id;
	const [comments, set_comments] = useState([]);

	// component did mount
	useEffect(() => {
		fetch(`/api/entry/${entry_id}/comments/`, {credentials: 'same-origin'})
		.then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		})
		.then((data) => {

			set_comments(data.comments);
			console.log("comments after mounting", comments);
			
		})
		.catch(error => console.log(error));
	}, []);

	function handleDelete(event) {

		const comment_id = event.target.attributes.comment_id.value;
		fetch('/api/entry/delete_comment/', {credentials: 'same-origin',
								 method: 'DELETE',
								 headers: {
								 	"X-CSRFToken": event.target.attributes.token.value
								 },
								 body: JSON.stringify({comment_id: comment_id})})
		  .then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	if (data.successful_delete) {
		  		set_comments(comments.filter(function(c_id) {
		  			return c_id !== Number(comment_id);
		  		}))
		  	}
		  	console.log("comments after deleting", comments);
		  })
		  .catch(error => console.log(error));
	}



	return (
		<AuthConsumer>
		{({context_csrf_token}) => (
			<div>
			<div>
				Comments:
				{comments.map(comment => (
					<div>
					<Comment comment_id={comment} />

					<button onClick={handleDelete} comment_id={comment} token={context_csrf_token} >
						delete 
					</button>
					</div>
					))}
			</div>
			<div>
				<NewComment entry_id={entry_id} />
			</div>
			</div>
		)}
		</AuthConsumer>
	);
}

export default Comments;