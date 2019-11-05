import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
// import 'draft-js/dist/Draft.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(),
                  entry_title: 'what',
                  url: ''};
    this.saveEntry = this.saveEntry.bind(this);
    this.onEntryChange = this.onEntryChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);


    // this.onEntryChange = (editorState) => this.setState({editorState});
    // this.saveEntry = this.saveEntry.bind(this);
  }

  componentDidMount() {
    fetch(this.props.url, {'credentials': 'same-origin'})
    .then((response) => {
        if (!response.ok) throw Error(response.statusText);
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

  // onChange = ()
  // onEntryChange (e) {
  //   this.setState({editorState: e.target.editorState});
  // }

  // onTitleChange (e) {
  //   this.setState({entry_title: e.target.entry_title});
  // }

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
    fetch(this.props.url, fetchData)
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

MyEditor.propTypes = {
  url: PropTypes.string.isRequired,
};

export default MyEditor;