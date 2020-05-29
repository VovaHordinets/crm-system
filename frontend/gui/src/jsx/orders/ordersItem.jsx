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

<<<<<<< HEAD

=======
  const validPhoneRegex = RegExp(/^[0-9\b]{10}$/);
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
  return (
    <li className="order-item">
      <div className="order__content">
        <form className="order__content edit" onSubmit={(event) => new OrderForm().handle_createOrder(event, "put", item.id)}>
          <div className="order__name">
<<<<<<< HEAD
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
=======
            <input type="text" name="name" required  className="output" placeholder={item.name} disabled={isDisabledInput} />
          </div>
          <div className="order__description">
            <input type="text" name="description" required className="output"  placeholder={item.description} disabled={isDisabledInput} />
          </div>
          <div className="order__customer">
            <input type="text" name="customer" required className="output" placeholder={item.customer} disabled={isDisabledInput} />
          </div>
          <div className="order__phone">
            <input type="tel" name="phone" required pattern="[0-9\b]{10}"  className="output"  placeholder={item.phone} disabled={isDisabledInput} />
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
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
<<<<<<< HEAD
            <></>
=======
            <div></div>
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
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
<<<<<<< HEAD
          <></>
=======
          <div></div>
>>>>>>> a31b4c18f8d76ac2acfdeca3f6a37442854c470d
        )}
      </div>
    </li>
  );
}
export default OrderItem;
