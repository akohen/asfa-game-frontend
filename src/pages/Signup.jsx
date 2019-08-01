import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/styles';

const Signup = styled(Paper)({
  padding: 10,
})

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.register(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
  <Signup>
    <form onSubmit={this.handleSubmit}>
    <p>To start playing, enter your name here</p>
    <TextField
      id="name"
      label="Player name"
      variant="outlined"
      value={this.state.value}
      onChange={this.handleChange}
    />
      <p><Button type="submit" variant="contained" color="primary">Sign up</Button></p>
      </form>
    </Signup>
    );
  }
}
