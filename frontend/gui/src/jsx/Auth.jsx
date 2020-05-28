import React, { Component } from "react";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Route, Redirect } from "react-router-dom";

import "../scss/Auth.css";
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class Auth extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      displayed_page: '',
      logged_in:  false,
      username: '',
      first_name: '',
      current_page: '/auth',
    };
  }

  handle_login = (e, data) => {
    e.preventDefault();
    if(validateForm(data.errors)) {
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if(json.user !== undefined){
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_page: '',
          username: json.user.username,
          first_name: json.user.first_name,
          current_page: '/home'
        })    
      window.location = this.state.current_page;
      }else{
        alert('Wrong password or phone number');
      }
    });
    }
    else{
      console.error('Invalid Form');
    }
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    console.log(data);
    if(validateForm(data.errors)) {
    fetch('http://localhost:8000/userauth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.username[0]);
        if(json.username[0] !== "A user with that username already exists."){
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_page: '',
          username: json.username,
          first_name: json.first_name,
          current_page: '/home'
        });
        window.location = this.state.current_page;
      }else{
        alert('This phone number is already used!');
      }
    });
    }
    else{
      console.error('Invalid Form');
    }
  };

  display_page = page => {
    this.setState({
      displayed_page: page
    });

  };

  render() {
    let form;
    switch (this.state.displayed_page) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
      return (
        <div className="auth_wrapper">
        <div className="loginContainer">
          <h1 className="title">GodDamnCRM</h1>
          <h3>Log In or Sign Up</h3>
          <Nav logged_in={this.state.logged_in} display_page={this.display_page} />
          <div className="Auth">{form}</div>
        </div>
      </div>
      );
  }
}

export default Auth;