import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/dashboard';

import MessageClient from './sockets';

const client = new MessageClient('ws://notman-marekweb.c9users.io:8080/socket');

ReactDOM.render(<Dashboard/>, document.getElementById('container'));
