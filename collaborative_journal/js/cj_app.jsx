import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import LoginScreen from './login'
import NavBar from './navigation_bar';
import Timeline from './timeline';
import Preview from './preview';
import JournalEntry from './journal_entry';
import {AuthProvider} from './context';
import ProtectedRoute from './protected_route';
import Account from './account';
import Register from './register';



import styles from '../css/cj_app.css';


 
function CJ_app(props) {  

  // render() {
    return (
      <BrowserRouter>
      <AuthProvider token={props.token}>
      <div>
        <div>
        <NavBar />
        </div>
        <div>
          <Switch>
              <ProtectedRoute component={Timeline} exact path="/" />
              <ProtectedRoute component={Account} path="/account" />
              <ProtectedRoute component={JournalEntry} path="/journal_entry/:entry_id"  />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={Register} />
          </Switch>
        </div>

      </div>
      </AuthProvider>
      </BrowserRouter>
    );
  // }
}
 
export default CJ_app;