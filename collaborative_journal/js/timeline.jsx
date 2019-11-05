import React from 'react';
import ReactDOM from 'react-dom';
import Entries from './entries';

ReactDOM.render(

  <Entries url="/api/entries/" />,

  document.getElementById('reactEntryTimeline'),
);

