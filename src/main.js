import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/dashboard';

import MessageClient from './message-client';

const client = new MessageClient('ws://notman.herokuapp.com/socket');

ReactDOM.render(<Dashboard/>, document.getElementById('container'));
