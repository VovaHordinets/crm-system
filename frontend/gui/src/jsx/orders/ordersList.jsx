import React from "react";
import axios from "axios";
import OrderItem from "./ordersItem";
class OrderList extends React.Component {
<<<<<<< HEAD
  state = {
    orders: [],
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = `JWT ${localStorage.getItem("token")}`;
    console.log(localStorage.getItem("token"));
    axios.get("http://localhost:8000/orders").then((res) => {
      this.setState({
        orders: res.data,
      });
      console.log(res.data);
    });
  }
  handleDelete = (event) => {
    const orderId = this.props.match.params.orderId;
    axios.delete(`http://localhost:8000/orders/${orderId}`);
  };

  render() {
    return (
      <ul className="image-items">
        {this.state.orders.map((item) => {
          console.log(item);
          return <OrderItem key={item.id} item={item} />;
        })}
      </ul>
    );
  }
=======
    state = {
        orders: []
    }
    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`;
        console.log(localStorage.getItem('token'));
        axios.get('http://localhost:8000/orders')
            .then(res => {
                this.setState({
                    orders: res.data
                });
                console.log(res.data);
            })
            
    }
    render(){
        return(
            <ul className="image-items">
            {this.state.orders.slice(0).reverse().map((item) => {
              console.log(item);
              return <OrderItem key={item.id} item={item} />;
            })}
          </ul>
        );
    }
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
}
export default OrderList;
