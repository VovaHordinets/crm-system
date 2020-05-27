import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Route, Redirect } from 'react-router-dom'
import '../scss/Auth.css'
// function GotoMain(){
//   const history = useHistory();
//       history.push("/home");
// }
// const history = useHistory();
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
  // localStorage.getItem('token') ? true :


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
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_page: '',
          username: json.user.username,
          first_name: json.user.first_name,
          current_page: '/home'
        });
        window.location = this.state.current_page;  
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
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_page: '',
          username: json.username,
          first_name: json.first_name,
          current_page: '/home'
        });
        window.location = this.state.current_page;
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
    // if(!this.state.logged_in){
      return (
        <div className="auth_wrapper">
          <h3>
              Please Log In 
          </h3>
          <Nav
            logged_in={this.state.logged_in}
            display_page={this.display_page}
            // handle_logout={this.handle_logout}
          />
          <div className="Auth">
          {form}

          </div>
          </div>
      );
    // }
    // else{
          // const history = useHistory();
    // history.push("/home");
      // return(
      //   <div>
      //     <h1> {`Hello, ${this.state.first_name}`}</h1>
      //     <Nav
      //       logged_in={this.state.logged_in}
      //       display_page={this.display_page}
      //       handle_logout={this.handle_logout}
      //     />
      //       <Main />
      //   </div>

      // );
    // }
    
  }
}

export default Auth;