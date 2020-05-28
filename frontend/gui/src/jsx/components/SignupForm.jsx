import React from "react";
import PropTypes from "prop-types";

const validPhoneRegex = RegExp(/^[0-9\b]{10}$/);
const strongPassword = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class SignupForm extends React.Component {
  state = {
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    errors: {
      username: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  };
  handle_change = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "first_name":
        errors.first_name = value.length < 5 ? "Name must be 5 characters long at least!" : "";
        break;
      case "last_name":
        errors.last_name = value.length < 5 ? "Surname must be 5 characters long at least" : "";
        break;
      case "username":
        errors.username = validPhoneRegex.test(value) ? "" : "Incorrect phone number!";
        break;
      case "password":
        errors.password = strongPassword.test(value) ? "" : "Password is to weak!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={(e) => this.props.handle_signup(e, this.state)}>
        <label htmlFor="username">Phone</label>
        <div className="inpSec">
          <input
            placeholder="+38"
            type="tel"
            required="required"
            autoComplete="off"
            maxLength="10"
            name="username"
            value={this.state.username}
            onChange={this.handle_change}
          />
          {errors.username.length > 0 && <span className="error">{errors.username}</span>}
        </div>
        <label htmlFor="first_name">Name</label>
        <div className="inpSec">
        <input
          type="text"
          autoComplete="off"
          required="required"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handle_change}
        />
        {errors.first_name.length > 0 && <span className="error">{errors.first_name}</span>}
        </div>
        <label htmlFor="last_name">Surname</label>
        <div className="inpSec">
          <input
            type="text"
            required="required"
            autoComplete="off"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handle_change}
          />
          {errors.last_name.length > 0 && <span className="error">{errors.last_name}</span>}
        </div>
        <label htmlFor="password">Password</label>
        <div className="inpSec">
          <input
            type="password"
            required="required"
            name="password"
            value={this.state.password}
            onChange={this.handle_change}
          />
          {errors.password.length > 0 && <span className="error">{errors.password}</span>}
        </div>
        <input type="submit" className="submit" value="Sign Up" />
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired,
};
