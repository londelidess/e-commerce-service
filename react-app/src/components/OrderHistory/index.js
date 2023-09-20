import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Routes, Route } from 'react-router-dom';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddedToCartModal from "./AddedToCartModal";
import {
  thunkGetPastOrders,
  thunkReorderPastOrder,
  thunkGetCart,
} from "../../store/shoppingCart";
import {PacmanLoading} from "../Loading";
import "./orderhistory.css";

function OrderHistory() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const ordersObj = useSelector((state) => state.shoppingCart.orders);
  const orders = Object.values(ordersObj);
  const [reorderQuantities, setReorderQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchOrders() {
        await dispatch(thunkGetPastOrders());
        setIsLoading(false);
    }
    fetchOrders();
}, [dispatch]);

  const handleReorderQuantityChange = (productId, quantity) => {
    setReorderQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleReorder = async (orderId, items) => {
    const quantities = {};
    items.forEach((item) => {
      quantities[item.product_id] =
        reorderQuantities[item.product_id] || item.quantity;
    });
    await dispatch(thunkReorderPastOrder(orderId, quantities));
    await dispatch(thunkGetCart());
  };

  if (!sessionUser) {
    navigate("/");
    return null;
}
  if (isLoading) return <PacmanLoading />;
  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>

      {orders && orders.length === 0 ? (
        <p className="no-orders-msg">You have no past orders.</p>
      ) : (
        <div className="orders-list">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <div key={order.id} className="single-order">
                <p className="order-timestamp">Timestamp: {order.timestamp}</p>
                <p className="order-total">Total: ${order.total_amount}</p>
                <ul className="order-items">
                  {order.items.map((item) => (
                    <li key={item.product_id} className="order-item">
                      <strong className="order-item-name">
                        {item.product_name}
                      </strong>
                      <br />
                      Quantity:
                      <input
                        type="number"
                        className="order-item-quantity"
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          handleReorderQuantityChange(
                            item.product_id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <br />
                      <p className="order-item-price">
                        Single Price: ${item.price_at_time_of_purchase}
                      </p>
                      <br />
                    </li>
                  ))}
                </ul>
                <button
                  className="reorder-button"
                  onClick={() => handleReorder(order.id, order.items)}
                >
                  <OpenModalMenuItem
                    itemText="Reorder this Toy"
                    modalComponent={<AddedToCartModal />}
                  />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
export default OrderHistory;
