import React from 'react';
import ReactDOM from 'react-dom';
import CJ_app from './cj_app';


ReactDOM.render(
    <CJ_app token={ document.getElementById('csrftoken').content }/>,
   document.getElementById('reactEntry'),
);
