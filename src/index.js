import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Rules from './pages/Rules';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';

import theme from './theme';
import './index.css';


const client = new ApolloClient({
  uri: "http://127.0.0.1:4000"
});

ReactDOM.render(<Router>
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route exact path="/" component={Game} />
      <Route path="/rules" component={Rules} />
      <Route path="/leaderboard" component={Leaderboard} />
    </ThemeProvider>
  </ApolloProvider>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
