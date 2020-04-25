import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Meetings from './components/Meetings/Meetings'
import Login from './components/Login/Login';
import Preview from './components/Meeting/Preview/Preview';
import LoginLayoutRoute from './layouts/LoginLayout/LoginLayout';
import AppLayoutRoute from './layouts/AppLayout/AppLayout';
import PreviewLayoutRoute from './layouts/PreviewLayout/PreviewLayout';
import Player from './components/Meeting/Player/Player';
import Consent from './components/Meeting/Preview/Consent/Consent';
import Logs from './components/Meeting/Logs/Logs';
import ThankYou from './components/Meeting/Preview/ThankYou/ThankYou';
import Company from './components/Company/Company';
import Region from './components/Region/Region';
import Zone from './components/Zone/Zone';
import Territory from './components/Territory/Territory';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/meeting/preview/thankyou" component={ThankYou} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <LoginLayoutRoute path="/login" component={Login} />
        <AppLayoutRoute path="/meetings" component={Meetings} />
        <AppLayoutRoute path="/meeting/player" component={Player} />
        <PreviewLayoutRoute path="/meeting/preview" exact component={Preview} />
        <LoginLayoutRoute path="/meeting/preview/consent" component={Consent} />
        <AppLayoutRoute path="/meeting/logs" component={Logs} />
        <AppLayoutRoute path="/company" component={Company} />
        <AppLayoutRoute path="/Region" component={Region} />
        <AppLayoutRoute path="/Zone" component={Zone} />
        <AppLayoutRoute path="/Territory" component={Territory} />

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
