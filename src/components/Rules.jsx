import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
const Rules = styled(Paper)({
  padding: 10,
});

const Component = () => (
  <Rules>
    <p>In this game, you must hire Pirates, Samurai and Vikings who will travel back to their base to bring you points</p>
    <p>To hire a unit, you must team up with another player who wants to hire the same unit as you.</p>
    <p>You can only hire a unit once per game with the same player</p>
    <p>At the end of each round, units of your most numerous type will travel to their base and share the available points there. For example, if there are 23 points in Tokyo and 5 samurai are sent (between all players), each Samurai will bring 4 points to its owner and 3 points will remain for the next round</p>
    <p>If your most numerous units are tied, no unit is sent this round. You lose 5 points if you don't send any unit during a round.</p>
    <p>At the beginning of each round, all units are lost, and the bases get new points</p>
    <p>The player with the most points after 4 rounds wins the game</p>
    <p>Trigger test</p>
    <Button component={Link} to="/" variant="contained" color="primary">Home</Button> 
  </Rules>
);

export default Component;
