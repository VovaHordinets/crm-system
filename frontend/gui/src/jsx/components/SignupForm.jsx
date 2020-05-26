import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  state = {
    username: '',
    regexp : /^[0-9\b]+$/,
    first_name: '',
    last_name: '',
    password: ''
  };
  onHandleTelephoneChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    // if value is not blank, then test the regex
    if (value === '' || this.state.regexp.test(value)) {
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    }
};
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <label htmlFor="username">Phone</label>
        <input
          type="tel"
          required = 'required'
          autoComplete="off" 
          name="username"
          value={this.state.username}
          onChange={this.onHandleTelephoneChange}
        />
        <label htmlFor="first_name">Name</label>
        <input
          type="text"
          autoComplete="off"
          required = 'required' 
          name="first_name"
          value={this.state.first_name}
          onChange={this.handle_change}
        />
        <label htmlFor="last_name">Surname</label>
        <input
          type="text"
          required = 'required'
          autoComplete="off" 
          name="last_name"
          value={this.state.last_name}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required = 'required'
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};