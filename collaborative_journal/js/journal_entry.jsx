import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
// import 'draft-js/dist/Draft.css';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state.new_entry) {
      // new entry (will come with entry_id)
    }
    else {
      // editting existing entry
    }


    this.state = {entry_id: this.props.location.state.entry_id,
                  editorState: EditorState.createEmpty(),
                  entry_title: 'what',
                  url: ''};
    console.log(this.state);
    console.log(this.state.entry_id.entry_id);
    this.saveEntry = this.saveEntry.bind(this);
    this.onEntryChange = this.onEntryChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);

  }

  componentDidMount() {
    fetch(`/api/entry/${this.state.entry_id}`, {'credentials': 'same-origin'})
    .then((response) => {
        return response.json();
      })
    .then((data) => {
      this.setState({
        editorState: convertFromRaw(JSON.parse(data.entry_content)),
        entry_title: data.entry_title,
        url: data.url
      });
    })
    .catch(error => console.log(error));
  }

  onEntryChange (editorState) {
    this.setState({editorState: editorState});
  }

  onTitleChange (event) {
    this.setState({entry_title: event.target.value});
  }

  saveEntry () {
    const fetchData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry_title: this.state.entry_title,
                             entry: convertToRaw(this.state.editorState.getCurrentContent()),
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
      <div>
        <div class="title">
          <textarea value={this.state.entry_title} onChange={(event) => this.onTitleChange(event)} /> 
        </div>
        <div>
          <Editor editorState={this.state.editorState} onChange={this.onEntryChange} />
        </div>
        <div>
          <button id="saveButton" onClick={this.saveEntry}>
            Save
          </button>
          {this.state.entry_title}
        </div>
      </div>
    );
  }
}
// <Editor editorState={this.state.editorState} onChange={(event) => this.onEntryChange(event)} />

// JournalEntry.propTypes = {
//   url: PropTypes.string.isRequired,
// };

export default JournalEntry;