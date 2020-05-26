import React, { Component } from 'react';
import {useHistory } from 'react-router-dom';
import Nav from './components/Nav';
class Main extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          displayed_page: '',
          logged_in:  true,
          username: '',
          first_name: '',
          current_page: '/home',
        };
      }
    componentDidMount() {
        if (this.state.logged_in) {
          fetch('http://localhost:8000/userauth/current_user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => res.json())
            .then(json => {
              this.setState({ username: json.username,first_name: json.first_name });
            });
        }
      }
      handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false,username: '', first_name: '' ,current_page: '/auth'});
        window.location = this.state.current_page;  
      };
    
    // const history = useHistory();
    // history.push("/home");
    render(){
    return(
        <div>
        <Nav
            logged_in={this.state.logged_in}
            // display_page={this.display_page}
            handle_logout={this.handle_logout}
        />

        <h1>{`Hello, ${this.state.first_name}`}</h1>
        </div>
    );
}
}
export default Main;