import React from 'react';
import './App.scss';
import { LandingPage } from './landingPage/landingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ProjectPage } from './projectPage/projectPage';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LandingPage test='name' />
        </Route>
        <Route exact path='/project' component={ProjectPage}>
        </Route>
      </Switch>
    </Router>

  );
}
export default App;
