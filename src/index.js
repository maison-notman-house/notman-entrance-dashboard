import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/dashboard';

import MessageClient from './message-client';
import { Router, Route, browserHistory } from 'react-router';

new MessageClient('ws://notman.herokuapp.com/socket');

ReactDOM.render(( //<Dashboard/>
<Router history={browserHistory}>
  <Route path="/" component={Dashboard}>
  </Route>
</Router>), document.getElementById('container'));