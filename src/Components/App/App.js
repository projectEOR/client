import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Profile from '../Profile/Profile';
import Tracker from '../Tracker/Tracker';
import Builder from '../Builder/Builder';
import Organization from '../Organization/Organization';

import NavBar from '../NavBar/NavBar';

function App() {
  return (
    <>
      <Router>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <Organization  />
            </Route>
            <Route exact path="/tracker">
              <Tracker />
            </Route>
            <Route path="/builder">
              <h1>Builder</h1>
              <Builder />
            </Route>
            <Route path="/profile/:id"> 
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
