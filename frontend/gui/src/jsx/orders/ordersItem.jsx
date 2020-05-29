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
  const [isName, setIsName] = useState(item.name);
  const [isDesctiption, setIsDesctiption] = useState(item.description);
  const [isCustomer, setIsCustomer] = useState(item.customer);
  const [isPhone, setIsPhone] = useState(item.phone);

  let undisabled = () => {
    setIsDisabledInput(!isDisabledInput);
  };

  const validPhoneRegex = RegExp(/^[0-9\b]{10}$/);
  return (
    <li className="order-item">
      <div className="order__content">
        <form
          className="order__content edit"
          onSubmit={(event) => new OrderForm().handle_createOrder(event, "put", item.id)}
        >
          <div className="order__name">
            <input
              type="text"
              name="name"
              className="output"
              value={isName}
              onChange={(event) => setIsName(event.target.value)}
              disabled={isDisabledInput}
            />
          </div>
          <div className="order__description">
            <input
              type="text"
              name="description"
              className="output"
              value={isDesctiption}
              onChange={(event) => setIsDesctiption(event.target.value)}
              disabled={isDisabledInput}
            />
          </div>
          <div className="order__customer">
            <input
              type="text"
              name="customer"
              className="output"
              value={isCustomer}
              onChange={(event) => setIsCustomer(event.target.value)}
              disabled={isDisabledInput}
            />
          </div>
          <div className="order__phone">
            <input
              type="tel"
              name="phone"
              pattern="[0-9\b]{10}"
              className="output"
              value={isPhone}
              onChange={(event) => setIsPhone(event.target.value)}
              disabled={isDisabledInput}
            />
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
            <div></div>
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
          <div></div>
        )}
      </div>
    </li>
  );
}
export default OrderItem;
