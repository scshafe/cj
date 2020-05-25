import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {AuthConsumer} from './context';
// import 'draft-js/dist/Draft.css';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {entry_id: this.pr}
    if (this.props.location.state.is_new_entry) {
      console.log("new entry");
      this.state = {editor_state: EditorState.createEmpty(),
                    title: ''
                    };
    }
    else {

      this.state = {entry_id: this.props.location.state.entry_id,
                    editor_state: EditorState.createEmpty(),
                    title: this.props.location.state.title,
                    url: ''};
      console.log(this.state);
    }
    this.saveEntry = this.saveEntry.bind(this);
    this.onEntryChange = this.onEntryChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state.is_new_entry)
    console.log(this.props.location.state);
    const api_url = this.props.location.state.is_new_entry ? '/api/entry/new/' : `/api/entry/${this.state.entry_id}`;
    fetch(api_url, {'credentials': 'same-origin'})
    .then((response) => {
        return response.json();
      })
    .then((data) => {
      console.log(data);
      if (this.props.location.state.is_new_entry) {
        console.log(data);
        this.setState({ title: '', entry_id: data.id });
      }
      else {
        this.setState({
          editor_state: EditorState.createWithContent(convertFromRaw(JSON.parse(data.editor_state))),
          title: data.title,
          url: data.url,

        });
      }
    })
    .catch(error => console.log(error));
    console.log(this.state);
  }

  onEntryChange (editor_state) {
    this.setState({editor_state: editor_state});
  }

  onTitleChange (event) {
    this.setState({title: event.target.value});
  }

  saveEntry (event) {
    event.preventDefault();
    if (this.state.cookie == ''){
      alert("cookie is not set");
      return;
    }
    const fetchData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": event.target.attributes.token.value
      },
      body: JSON.stringify({ title: this.state.title,
                             editor_state: convertToRaw(this.state.editor_state.getCurrentContent()),
                             })
    };
    fetch(`/api/entry/${this.state.entry_id}/`, fetchData)
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

  render() {
    return (
      <AuthConsumer>
      {({context_csrf_token}) => (
      <div>
        <div class="title">
          <textarea value={this.state.title} onChange={(event) => this.onTitleChange(event)} /> 
          {this.state.title}
        </div>
        <div>
          <Editor editorState={this.state.editor_state} onChange={this.onEntryChange} />
        </div>
        <div>
          <button id="saveButton" onClick={this.saveEntry} token={context_csrf_token} >
            Save
          </button>
        </div>
      </div>
      )}
      </AuthConsumer>
    );
  }
}
// <Editor editorState={this.state.editorState} onChange={(event) => this.onEntryChange(event)} />

// JournalEntry.propTypes = {
//   url: PropTypes.string.isRequired,
// };

export default JournalEntry;