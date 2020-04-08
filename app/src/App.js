import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Meetings from './components/Meetings/Meetings'
import Login from './components/Login/Login';
import Preview from './components/Meeting/Preview/Preview';
import LoginLayoutRoute from './layouts/LoginLayout/LoginLayout';
import AppLayoutRoute from './layouts/AppLayout/AppLayout';
import PreviewLayoutRoute from './layouts/PreviewLayout/PreviewLayout';
import Player from './components/Meeting/Player/Player';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <LoginLayoutRoute path="/login" component={Login} />
        <AppLayoutRoute path="/meetings" component={Meetings} />
        <AppLayoutRoute path="/meeting/player" component={Player} />
        <PreviewLayoutRoute path="/meeting/preview" component={Preview} />
        
      </Switch>
    </Router>
    // <Router>
    //   <Route path="/" exact component={Login} />
    //   <Route path="/meetings" component={Meetings} />
    //   <Route path="/meeting" exact component={Meeting} />
    //   <Route path="/meeting/preview" component={Preview} />
    // </Router>
  );
}

export default App;
