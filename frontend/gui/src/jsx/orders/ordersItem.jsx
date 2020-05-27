import React from 'react';
import axios from 'axios';
let handleDelete = (event,id) =>{
    event.preventDefault();
    const orderId = id;
    axios.delete(`http://localhost:8000/orders/${orderId}`);
}
function OrderItem({item}){

    return(
    <li className="order-item">
        <div className="order__content">
            <div className="order__name">{item.name}</div>
            <div className="order__description">{item.description}</div>
            <div className="order__customer">{item.customer}</div>
            <div className="order__phone">{item.phone}</div>
            <div className="problems__btn">
                <form  onSubmit={(event) => handleDelete(event,item.id)}>
                <button type="submit" className="btn-order btn-order__delete">Delete</button>
                </form>
                <form  onSubmit={(event) => handleDelete(event,item.id)}>
                <button type="submit" className="btn-order btn-order__update">Update</button>
                </form>
            </div>
        </div>
    </li>
    );
}
export default OrderItem;