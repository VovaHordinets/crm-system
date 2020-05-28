import React, { useState } from "react";
import axios from "axios";
import OrderForm from "./ordersInput";

let handleDelete = (event, id) => {
  event.preventDefault();
  const orderId = id;
  axios.delete(`http://localhost:8000/orders/${orderId}`);
};

function OrderItem({ item }) {
  const [isDisabledInput, setIsDisabledInput] = useState(true);

  let undisabled = () => {
    setIsDisabledInput(!isDisabledInput);
  };


  return (
    <li className="order-item">
      <div className="order__content">
        <form className="order__content edit" onSubmit={(event) => new OrderForm().handle_createOrder(event, "put", item.id)}>
          <div className="order__name">
            <input type="text" name="name" className="output" placeholder={item.name} disabled={isDisabledInput} />
          </div>
          <div className="order__description">
            <input type="text" name="description" className="output"  placeholder={item.description} disabled={isDisabledInput} />
          </div>
          <div className="order__customer">
            <input type="text" name="customer" className="output" placeholder={item.customer} disabled={isDisabledInput} />
          </div>
          <div className="order__phone">
            <input type="tel" name="phone"  className="output"  placeholder={item.phone} disabled={isDisabledInput} />
          </div>
          {!isDisabledInput ? (
            <div className="problems__btn in">
              <button type="submit" className="btn-order btn-order__update">
                Update
              </button>
              <button type="button" className="btn-order btn-order__update" onClick={() => undisabled()}>
                Cancel
              </button>
            </div>
          ) : (
            <></>
          )}
        </form>

        {isDisabledInput ? (
          <div className="problems__btn">
            <form onSubmit={(event) => handleDelete(event, item.id)} style={{ display: "flex" }}>
              <button type="submit" className="btn-order btn-order__delete">
                Delete
              </button>
            </form>
            <button type="submit" className="btn-order btn-order__update" onClick={() => undisabled()}>
              Update
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
}
export default OrderItem;
