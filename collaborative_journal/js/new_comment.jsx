import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {AuthConsumer} from './context';

function NewComment(props) {

	// const comment_id = props.comment_id;
	const entry_id = props.entry_id;
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
		fetch(`/api/entry/${entry_id}/comments/`, {credentials: 'same-origin'})
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

	function saveComment(event) {
		event.preventDefault();
		const fetchData = {
	      credentials: 'same-origin',
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        "X-CSRFToken": event.target.attributes.token.value
	      },
	      body: JSON.stringify({ 
	                             editor_state: convertToRaw(editor_state.getCurrentContent()),
	                             entry_id: entry_id,
	                             new_comment: true,
	                             shared: is_public
	                             })
	    };
	    fetch(`/api/entry/comment/`, fetchData)
	    .then((response) => {
	        if (!response.ok) throw Error(response.statusText);
	        return response.json();
	      })
	    .then((data) => {
	      if (data.successful_save) {
	        alert("saved");
	        set_editor_state(EditorState.createEmpty());
	      }
	    })
	    .catch(error => console.log(error));
	}


	return (
		<AuthConsumer>
		{({context_csrf_token}) => (
			<div>
				<form>
					<input type="checkbox" id="comment_public_option" name="public" value={is_public} />
				</form>
				<Editor editorState={editor_state} onChange={onEntryChange} />
				<button onClick={saveComment} token={context_csrf_token} >save</button>
			</div>
		)}
		</AuthConsumer>
	);
}

export default NewComment;