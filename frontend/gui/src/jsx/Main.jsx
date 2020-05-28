import React, { Component } from 'react';
import {useHistory } from 'react-router-dom';
import Nav from './components/Nav';
import OrderInput from './orders/ordersInput';
import OrderList from './orders/ordersList'
import '../scss/Main.css'
import '../scss/orders.css'
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
<div className="main_wrapper">
        <div className="header">
          <div className="header_user_name">
            <h1 className="userName">Logged as {`${this.state.first_name}`}</h1>
          </div>
          <h1 className="title">GodDamnCRM</h1>
          <Nav
            logged_in={this.state.logged_in}
            // display_page={this.display_page}
            handle_logout={this.handle_logout}
          />
        </div>
        <div className="wrapper_content">
          <OrderInput />
          <div className="table">
            <div className="image-items">
              <div className="order__content actionName">
                <div className="order__name">
                  <h1 className="title">Name</h1>
                </div>
                <div className="order__description">
                  <h1 className="title">Description</h1>
                </div>
                <div className="order__customer">
                  <h1 className="title">Customer</h1>
                </div>
                <div className="order__phone">
                  <h1 className="title">Phone</h1>
                </div>
                <div className="problems__btn">
                  <h1 className="title">Actions</h1>
                </div>
              </div>
            </div>
            <OrderList />
          </div>
        </div>
      </div>
    );
}
}
export default Main;