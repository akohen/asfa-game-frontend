import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Rules from './components/Rules';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Recruit from './components/Recruit';
import Reset from './components/Reset';

import theme from './theme';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
});

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [localStorageKey, value]);

  return [value, setValue];
};

const App = () => {
  const [id, setId] = useStateWithLocalStorage('player_id');
  const [secret, setSecret] = useStateWithLocalStorage('player_secret');

  return (
<Router>
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route exact path='/' render={(props) => 
        <Game {...props} myPlayer={{id, setId, secret, setSecret}} />
      }/>
      <Route path="/rules" component={Rules} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path='/reset' render={(props) => 
        <Reset {...props} myPlayer={{id, setId, secret, setSecret}} />
      }/>
      <Route path='/recruit' render={(props) => 
        <Recruit {...props} myPlayer={{id, setId, secret, setSecret}} />
      }/>
    </ThemeProvider>
  </ApolloProvider>
</Router>
)};

export default App;


