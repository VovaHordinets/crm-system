import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  const validPhoneRegex = RegExp(/^[0-9\b]{10}$/);

class OrderForm extends React.Component {
    state = {
        name: '',
        description: '',
        customer: '',
        phone: '',
        errors: {
            name: '',
            customer: '',
            phone: ''
          }
      };
      
    handle_createOrder = (event, requestType,id) => {
        // event.preventDefault();
        if(validateForm(this.state.errors)) {
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
                },window.location.reload()
                )
                .then(res => console.log(res))
                .catch(err =>console.log(err));
            case 'put':
                return axios.put(`http://localhost:8000/orders/${id}/`,{
                    name: name,
                    description: description,
                    customer: customer,
                    phone: phone
                })
                .then(res => console.log(res))
                .catch(err =>console.log(err));
        }
    }
    else{
        console.error('Invalid Form')
      }

      };
      handle_change = e => {
        event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 5
            ? 'Name must be 5 characters long at least!'
            : '';
        break;
      case 'customer': 
        errors.customer = 
            value.length < 5
            ? 'Customer name must be 5 characters long at least'
            : '';
        break;
      case 'phone':
        errors.phone = validPhoneRegex.test(value)
            ? ''
            : 'Incorrect phone number!';
            break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
      };
    render() {
        const {errors} = this.state;
        return (
<form className="order-form" onSubmit={(event) => this.handle_createOrder(event, "post", null)}>
        <div className="actionName">
          <div className="spacer"> </div>
          <h1 className="title">Add New Order</h1>
          <div className="spacer"> </div>
        </div>
        <label className="labelInp" htmlFor="name">
          Order's name
        </label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          autoComplete="off"
          required="required"
          onChange={this.handle_change}
        />
        {errors.name.length > 0 && <span className="error">{errors.name}</span>}
        <label className="labelInp" htmlFor="description">
          Description
        </label>
        <input
          placeholder="Enter some description"
          type="text"
          value={this.state.description}
          name="description"
          onChange={this.handle_change}
        />
        <label className="labelInp" htmlFor="customer">
          Customer
        </label>
        <input type="text" maxLength="20" value={this.state.customer} name="customer" onChange={this.handle_change} />
        {errors.customer.length > 0 && <span className="error">{errors.customer}</span>}
        <label className="labelInp" htmlFor="phone">
          Customer's Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={this.state.phone}
          placeholder="+38"
          autoComplete="off"
          maxLength="10"
          required="required"
          onChange={this.handle_change}
        />
        {errors.phone.length > 0 && <span className="error">{errors.phone}</span>}
        <input type="submit" className="submit" value="Add Order" />
      </form>
        );
      }
    }
    
    export default OrderForm;