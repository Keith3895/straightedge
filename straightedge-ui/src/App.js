import React from 'react';
import './App.scss';
import {LandingPage} from './landingPage/landingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage  test='name'/>
        </Route>
        <Route exact path='/else'>
          <ELES />
        </Route>
      </Switch>
    </Router>

  );
}
function ELES() {
  return (
    <h2>esss</h2>
  );
}
export default App;
