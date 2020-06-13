import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {AuthConsumer} from './context';

function Comment(props) {

	const comment_id = props.comment_id;
	const [editor_state, set_editor_state] = useState(EditorState.createEmpty());
	const [is_public, set_is_public] = useState(false);

	function handlePublicChange(event) {
		set_is_public(event.target);
	}

	function onEntryChange (editorState) {
	    set_editor_state(editorState);
	}


	// component did mount
	useEffect(() => {
		fetch(`/api/comment/${comment_id}/`, {credentials: 'same-origin'})
		.then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		})
		.then((data) => {
			set_editor_state(EditorState.createWithContent(convertFromRaw(JSON.parse(data.editor_state))));
			
		})
		.catch(error => console.log(error));
	}, []);

	function handleDelete(event) {

		console.log("Deleting comment needs to be implemented")
	}



	return (
		<AuthConsumer>
		{({context_csrf_token}) => (
			<div>
				<form>
					<input type="checkbox" id="comment_public_option" name="public" value={is_public} />
				</form>
				<Editor editorState={editor_state} onChange={onEntryChange} />
			</div>
		)}
		</AuthConsumer>
	);
}

export default Comment;