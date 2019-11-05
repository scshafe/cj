import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import EntryComment from './entry_comment';
import {Editor, EditorState} from 'draft-js';

class EntryText extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entry_text: '',
      entry_comments: [],
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});

  }

  componentDidMount() {
    fetch(this.props.url, { credentials: 'same-origin'})
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          entry_text: data.entry_text,
          entry_comments: data.entry_comments
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div class="entry_text" contentEditable="true">
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
        }
    );
  }
}

EntryText.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EntryText;
