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
import OverviewProvider, { OverviewContext } from '../Organization/OverviewContext'

import NavBar from '../NavBar/NavBar';
import OverviewChart from '../Organization/OverviewChart';

function App() {
  return (
    <>
      <Router>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <OverviewProvider>
              <Organization  />
              
              
              </OverviewProvider>
            </Route>
            <Route exact path="/tracker">
              <Tracker />
            </Route>
            <Route path="/builder">
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
