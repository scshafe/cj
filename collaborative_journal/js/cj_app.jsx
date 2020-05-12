import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import NavBar from './navigation_bar';
import Timeline from './timeline';
import Preview from './preview';
import JournalEntry from './journal_entry';


 
class CJ_app extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
      
        <div>
          <NavBar />
        </div>

        <div>
          <Switch>
            <Route exact path="/" component={Timeline}/>
            <Route name="edit_entry" path="/journal_entry/:entry_id" component={JournalEntry} />
          </Switch>
        </div>

      </div>
      </BrowserRouter>


    );
  }
}
 
export default CJ_app;