import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Signup from './Signup';

const GET_STATUS = gql`
  query Status($id: String!) {
    status(player: $id) {
      id
      points
      player {
        id
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
    id
    name
    invite
  }
}
`;

const SIGNUP = gql`
mutation Signup($name: String!, $secret: String!) {
  signup(name: $name, secret: $secret) {
    id
    name
  }
}
`;

const Status = ({game}) => (<div>
  <div>Current Score : {game.player.score}</div>
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
  secret = Math.random().toString(36).substring(2);

  register(d) {
    this.props.myPlayer.setId(d.id);
    this.props.myPlayer.setSecret(this.secret);
  }

  render() {
    if(this.props.myPlayer.id === '') {
      return (
      <Mutation mutation={SIGNUP} onCompleted={(d) => {this.register(d.signup)}}>
        {signup => (
          <Signup register={(n) => signup(
            { variables: { name: n, secret: this.secret } }
          )} />
        )}
      </Mutation>
      );
    } else return (
      <Query query={GET_STATUS} pollInterval={5000} variables={{ id: this.props.myPlayer.id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <Status game={data.status} />
              <Units player={data.status.player} />
              <p>
                {data.status.player.invite ? 
                  <Mutation mutation={CANCEL_INVITE} key={this.props.myPlayer.id}>
                  {cancelInvite => (
                    <Button onClick={() => {
                      cancelInvite({ variables: { from: this.props.myPlayer.id } });
                      refetch();
                    }}
                    variant="contained" color="primary">Cancel</Button>
                  )}
                </Mutation> : 
                  <Button component={Link} to="/recruit" variant="contained" color="primary">Recruit</Button>}
              </p>
              <p>
                <Button component={Link} to="/rules" variant="contained" color="secondary">Rules</Button> 
                <Button component={Link} to="/leaderboard" variant="contained" color="secondary">Leaderboard</Button></p>
            </div>
          );
        }}
        </Query>
)};

}
export default Game;
