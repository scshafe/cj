import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {AuthConsumer} from './context';
import ShareEntry from './share_entry';
import Comments from './comments';

import styles from '../css/journal_entry.css';

function JournalEntry(props) {

    console.log(props);

    const [new_entry, set_new_entry] = useState(props.location.state.is_new_entry);
    const [entry_id, set_entry_id] = (new_entry) ? useState(0) : useState(props.location.state.entry_id);
    const [title, set_title] = useState('');
    const [editor_state, set_editor_state] = useState(EditorState.createEmpty());


    useEffect(() => {
      if (!new_entry) {
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
    }
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
      body: JSON.stringify({ new_entry: new_entry,
                             entry_id: entry_id,
                             title: title,
                             editor_state: convertToRaw(editor_state.getCurrentContent()),
                             })
    };
    fetch(`/api/entry/save/`, fetchData)
    .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
    .then((data) => {
      if (data.successful_save) {
        alert("saved");
        set_entry_id(data.entry_id);
        set_new_entry(false);
      }
      else {
        alert("failed save");
      }
    })
    .catch(error => console.log(error));
  }


  return (
    <AuthConsumer>
    {({context_csrf_token}) => (
      <div className={styles.journalEntry} >
        <div className={styles.journalHeader} >

          <div className={styles.title}>
          title: <textarea value={title} onChange={onTitleChange} />
          </div>

          <div className={styles.buttonAlignment} >
            <div className={styles.shareButton} >
            {!new_entry && <ShareEntry post_id={entry_id} />}
            </div>

            <div className={styles.saveButton} >
              <button id="saveButton" onClick={saveEntry} token={context_csrf_token} >
                Save
              </button>
            </div>
          </div>

        </div>

        <div className={styles.journalEditor} >
          <Editor editorState={editor_state} onChange={onEntryChange} />
        </div>
        
        <div>
          {!new_entry &&
          <Comments entry_id={entry_id} />
          }
        </div>
      </div>
    )}
    </AuthConsumer>
  );
}


export default JournalEntry;

