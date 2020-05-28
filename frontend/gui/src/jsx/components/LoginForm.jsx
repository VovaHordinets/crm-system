import React from "react";
import PropTypes from "prop-types";

const validPhoneRegex = RegExp(/^[0-9\b]{10}$/);
const strongPassword = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
    },
  };

  handle_change = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username = validPhoneRegex.test(value) ? "" : "Incorrect phone number!";
        break;
      case "password":
        errors.password = strongPassword.test(value) ? "" : "Password is too small";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={(e) => this.props.handle_login(e, this.state)}>
        <div className="inpSec">
          <div className="labelInp">
            <label htmlFor="username">Phone</label>
            <input
              placeholder="+38"
              type="tel"
              name="username"
              maxLength="10"
              autoComplete="off"
              required="required"
              value={this.state.username}
              onChange={this.handle_change}
              noValidate
            />
          {errors.username.length > 0 && <span className="error">{errors.username}</span>}
          </div>
        </div>

        <div className="inpSec">
          <div className="labelInp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required="required"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
              noValidate
            />
          {errors.password.length > 0 && <span className="error">{errors.password}</span>}
          </div>
        </div>
        <input type="submit" className="submit" value="Sign In" />
      </form>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
};
