import React from 'react';
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import { Link, withRouter } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const Panel = styled(Paper)({
  padding: 10,
});

const GET_PLAYERS = gql`
  query listPlayers($id: String) {
    players(canTradeWith: $id) {
      id
      name
    }
  }
`;

const CREATE_INVITE = gql`
mutation CreateInvite($from: String!, $to: String!, $unit: Int!){
  interact(from: $from, to: $to, unit: $unit) {
    id
    name
    invite
  }
}`;

function Recruit(props) {
  const [playerId, setId] = React.useState('');

  function handleChange(event) {
    setId(event.target.value);
  }

  function sendInteract(unit, interact) {
    if(playerId !== '') {
      interact({ variables: { from: props.myPlayer.id, to: playerId, unit} })
      props.history.push('/');
    }
  }

  return (
    <Panel>
      <h2>Hiring a unit</h2>
    <FormControl>
    <Query query={GET_PLAYERS} variables={{id: props.myPlayer.id}}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      
        return (<Select
          value={playerId}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a player
          </MenuItem>
          {data.players.map(({ id, name }) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
          ))}
        </Select>);
    }}
    </Query>
        
        <FormHelperText>Player</FormHelperText>
      </FormControl>
    <p>Select a unit to hire with this player</p>
    <p>This will cost each of you one point and will add points to the bases of the other factions</p>
    <p>The other player will need to do the same thing on his side to confirm</p>
    <p>You will not be able to hire another unit with the same player for the rest of the game</p>
    <Mutation mutation={CREATE_INVITE} key='A'>
    {interact => (
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Grid item xs={4}>
        <Button onClick={() => {sendInteract(0,interact)}} variant="contained" color="primary">Pirate</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => {sendInteract(1,interact)}} variant="contained" color="primary">Samurai</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => {sendInteract(2,interact)}} variant="contained" color="primary">Viking</Button>
      </Grid>
    </Grid>

    )}
    </Mutation>
  
    <p><Button component={Link} to="/" variant="contained">Back</Button></p>
  </Panel>
  );
}

const RouterRecruit = withRouter(Recruit);
export default RouterRecruit;