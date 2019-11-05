import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './practice_editor';

ReactDOM.render(
  <MyEditor url="/api/entry/" />,
  document.getElementById('reactEntry'),
);


ReactDOM.render(
  <EntryList url="/api/entry/" />,
  document.getElementById('reactEntryTimeline'),
);

