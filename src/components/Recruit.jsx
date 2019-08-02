import React from 'react';
import { Link } from 'react-router-dom';
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

export default function SimpleSelect() {
  const [playerId, setId] = React.useState('');

  function handleChange(event) {
    setId(event.target.value);
  }

  return (
    <Panel>
      <h2>Hiring a unit</h2>
    <FormControl>
        <Select
          value={playerId}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a player
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Player</FormHelperText>
      </FormControl>
    <p>Select a unit to hire with this player</p>
    <p>This will cost each of you one point and will add points to the bases of the other factions</p>
    <p>The other player will need to do the same thing on his side to confirm</p>
    <p>You will not be able to hire another unit with the same player for the rest of the game</p>
  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
    <Grid item xs={4}>
      <Button variant="contained" color="primary">Pirate</Button>
    </Grid>
    <Grid item xs={4}>
      <Button variant="contained" color="primary">Samurai</Button>
    </Grid>
    <Grid item xs={4}>
      <Button variant="contained" color="primary">Viking</Button>
    </Grid>
  </Grid>
    <p><Button component={Link} to="/" variant="contained">Back</Button></p>
  </Panel>
  );
}
