import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {AuthConsumer} from './context';
import ShareEntry from './share_entry';
import Comments from './comments';

function JournalEntry(props) {

    console.log(props);
    const new_entry = props.location.state.is_new_entry;
    console.log(new_entry);

    const [entry_id, set_entry_id] = (new_entry) ? useState(0) : useState(props.location.state.entry_id);
    const [title, set_title] = useState('');
    const [editor_state, set_editor_state] =  useState(EditorState.createEmpty());



    // useEffect(() => {
    //   if (!new_entry) {
    //     fetch(`/api/entry/${entry_id}`, {'credentials': 'same-origin'})
    //     .then((response) => {
    //         return response.json();
    //       })
    //     .then((data) => {
    //       console.log(data);

    //       // if (new_entry) {
    //         // set_entry_id(data.id);
    //       // }
    //       // else {
    //         set_title(data.title);
    //         set_editor_state(EditorState.createWithContent(convertFromRaw(JSON.parse(data.editor_state)))); 
    //       // }
    //     })
    //     .catch(error => console.log(error));

    //   }
    //   const api_url = '/api/entry/save/';
    //   // const api_url = new_entry ? '/api/entry/new/' : `/api/entry/${entry_id}`;
        
    // }, []);


    useEffect(() => {
      const api_url = new_entry ? '/api/entry/new/' : `/api/entry/${entry_id}`;
      fetch(api_url, {'credentials': 'same-origin'})
      .then((response) => {
          return response.json();
        })
      .then((data) => {
        console.log(data);

        if (new_entry) {
          set_entry_id(data.id);
        }
        else {
          set_title(data.title);
          set_editor_state(EditorState.createWithContent(convertFromRaw(JSON.parse(data.editor_state)))); 
        }
      })
      .catch(error => console.log(error));
    }, []);

  

  function onEntryChange (editorState) {
    set_editor_state(editorState);
  }

  function onTitleChange (event) {
    set_title(event.target.value);
  }

  function onSharingNameChange (event) {
    set_sharing_name(event.target.value);
  }

  function saveEntry (event) {
    event.preventDefault();
    const fetchData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": event.target.attributes.token.value
      },
      body: JSON.stringify({ title: title,
                             editor_state: convertToRaw(editor_state.getCurrentContent()),
                             })
    };
    fetch(`/api/entry/${entry_id}/`, fetchData)
    .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
    .then((data) => {
      if (data.successful_save) {
        alert("saved");
      }
    })
    .catch(error => console.log(error));
  }


  return (
    <AuthConsumer>
    {({context_csrf_token}) => (
      <div>
        <div class="title">
          title: <textarea value={title} onChange={onTitleChange} />
          <ShareEntry post_id={entry_id} />
        </div>
        <div>
          <Editor editorState={editor_state} onChange={onEntryChange} />
        </div>
        <div>
          <button id="saveButton" onClick={saveEntry} token={context_csrf_token} >
            Save
          </button>
        </div>
        <div>
          <Comments entry_id={entry_id} />
        </div>
      </div>
    )}
    </AuthConsumer>
  );
}


export default JournalEntry;

