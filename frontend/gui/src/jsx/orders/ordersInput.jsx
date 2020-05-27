import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class OrderForm extends React.Component {
    state = {
        name: '',
        description: '',
        customer: '',
        regexp : /^[0-9\b]+$/,
        phone: ''
      };
    handle_createOrder = (event, requestType) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const description = event.target.elements.description.value;
        const customer = event.target.elements.customer.value;
        const phone = event.target.elements.phone.value;
        console.log(name,description,customer,phone);
        axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`;
        console.log(localStorage.getItem('token'));
        switch  (requestType){
            case 'post':
                return axios.post('http://localhost:8000/orders/',{
                    name: name,
                    description: description,
                    customer: customer,
                    phone: phone
                })
                .then(res => console.log(res))
                .catch(err =>console.log(err));
            case 'put':
                axios.put('http://localhost:8000/orders',{
                    name: name,
                    description: description,
                    customer: customer,
                    phone: phone
                })
                .then(res => console.log(res))
                .catch(err =>console.log(err));
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
    render() {
        return (
          <form className = "order-form" onSubmit={(event) => this.handle_createOrder(event,'post')}>
            <label htmlFor="name">Order's name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              autoComplete="off" 
              required = 'required'
              onChange={this.handle_change}
            />
            <label htmlFor="description">Description</label>
            <input
              placeholder="Enter some description"
              type="text"
              value={this.state.description}
              name="description"
              onChange={this.handle_change}
            />
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              value={this.state.customer}
              name="customer"
              onChange={this.handle_change}
            />
            <label htmlFor="phone">Customer's Phone</label>
            <input
            type="tel"
            name="phone"
            value={this.state.phone}
            autoComplete="off" 
            required = 'required'
            onChange={this.onHandleTelephoneChange}
            />
            <input type="submit" />
          </form>
        );
      }
    }
    
    export default OrderForm;
    
    OrderForm.propTypes = {
        handle_createOrder: PropTypes.func.isRequired
    };