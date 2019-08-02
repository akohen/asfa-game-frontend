import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Component = (props) => {
  props.myPlayer.setId('');
  props.myPlayer.setSecret('');
  console.log('clear');
  localStorage.clear();
  return (
  <div>
    <p>Local cache cleared</p>
    <Button component={Link} to="/" variant="contained" color="primary">Home</Button> 
  </div>
)};

export default Component;
