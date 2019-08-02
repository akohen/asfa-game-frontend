import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Signup from './Signup';

const GET_STATUS = gql`
  {
    status {
      id
      points
      nextTurn
      player {
        name
        score
        units
        invite
      }
    }
  }
`;

const CANCEL_INVITE = gql`
mutation CancelInvite($from: String!) {
  cancel(from: $from) {
    name
    invite
  }
}
`;

const Status = ({game}) => (<div>
  <div>Current Score : {game.player.score}</div>
  <div>Time left in the round : {game.nextTurn}</div>
  <h2>Current loot at each location</h2>
  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
    <Grid item xs={4}>
      <Paper>Caribbean <div>{game.points[0]}</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Japan <div>{game.points[1]}</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Scandinavia <div>{game.points[2]}</div></Paper>
    </Grid>
  </Grid>
</div>);

const Units = ({player}) => (
<div>
  <h2>You currently have</h2>
  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
    <Grid item xs={4}>
      <Paper>Pirate <div>{player.units[0]}</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Samurai <div>{player.units[1]}</div></Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>Viking <div>{player.units[2]}</div></Paper>
    </Grid>
  </Grid>
</div>
);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {player: 'test'};
  }

  register(player) {
    this.setState({player});
    console.log(this.state)
  }

  cancel() {
    console.log("cancel")
  }

  render() {
    if(this.state.player === null) {
      return (<Signup register={(i) => this.register(i)} />);
    } else return (
      <Query query={GET_STATUS} pollInterval={5000}>
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <Status game={data.status} />
              <Units player={data.status.player} />
              <p>
                <Button component={Link} to="/rules" variant="contained" color="secondary">Rules</Button> 
                <Button component={Link} to="/leaderboard" variant="contained" color="secondary">Leaderboard</Button>
                
                {data.status.player.invite ? 
                  <Mutation mutation={CANCEL_INVITE}>
                  {cancelInvite => (
                    <Button onClick={() => {
                      cancelInvite({ variables: { from: 'A' } });
                      refetch();
                    }}
                    variant="contained" color="primary">Cancel</Button>
                  )}
                </Mutation> : 
                  <Button component={Link} to="/recruit" variant="contained" color="primary">Recruit</Button>}
              </p>
            </div>
          );
        }}
        </Query>
)};

}
export default Game;
