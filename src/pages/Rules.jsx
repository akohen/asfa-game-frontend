import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Component = () => (
  <div>
    Hello! This should get deployed from a GCP trigger
    <Button component={Link} to="/" variant="contained" color="primary">Home</Button> 
  </div>
);

export default Component;
