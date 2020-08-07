import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Paper, Toolbar, Typography, AppBar } from '@material-ui/core';

import Messages from './components/messages';

const App: React.FunctionComponent = () => {
  return (
    <>
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h3" component="h1">Welcome to the Message App</Typography>
    </Toolbar>
    </AppBar>
      <Messages title="Send a message" />
    </>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);