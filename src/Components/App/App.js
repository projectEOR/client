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
import {ThemeProvider} from '@material-ui/styles'
import NavBar from '../NavBar/NavBar';
import theme from '../ui/Theme'
import {Paper} from '@material-ui/core'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
          <Switch>
            <Paper className="paper">
              <Route exact path="/">
                  <Organization  />
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
            </Paper>
          </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
