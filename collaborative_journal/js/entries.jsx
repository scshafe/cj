import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
// import 'draft-js/dist/Draft.css';

class EntryList extends React.Component {
	constructor(props) {

	}

	componentDidMount() {

	}

	render () {
		<div>
			{this.state.entries.map(e => (
              <div className="card">
                <Preview url={`api/entry/${e.entry_id}/`} />
              </div>
            ))}
		</div>
	}

}
// ARE THE SINGLE QUOTES AROUND THE URL FOR PREVIEW VALID???

EntryList.propTypes = {
	url: PropTypes.string.isRequired,
};

export default EntryList;