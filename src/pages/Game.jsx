import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Signup from './Signup';

const Status = () => (<div>
  <div>Current Score : 0</div>
  <div>Time left in the round : 10m12s</div>
</div>);

const Locations = () => (
<div>
  Current loot at each location
  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
    <Grid item xs={4}>
      <Paper>Japan <div>12</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Caribbean <div>12</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Scandinavia <div>12</div></Paper>
    </Grid>
  </Grid>
</div>
);

const Units = () => (
<div>
  You currently have
  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
    <Grid item xs={4}>
      <Paper>Japan <div>12</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Caribbean <div>12</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Scandinavia <div>12</div></Paper>
    </Grid>
  </Grid>
</div>
);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {player: null};
  }

  register(player) {
    this.setState({player});
    console.log(this.state)
  }

  render() { 
    if(this.state.player === null) {
      return (<Signup register={(i) => this.register(i)} />);
    } else return (
      <div>
        <Status />
        <Locations />
        <Units />
        
        <p>
          <Button component={Link} to="/rules" variant="contained" color="secondary">Rules</Button> 
          <Button component={Link} to="/leaderboard" variant="contained" color="secondary">Leaderboard</Button>
          <Button component={Link} to="/recruit" variant="contained" color="primary">Recruit</Button>
        </p>
      </div>
)};

}
export default Game;
