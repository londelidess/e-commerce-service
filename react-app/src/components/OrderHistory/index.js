import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import ClearCartModal from "./ClearCartModal"
import { thunkGetPastOrders,thunkReorderPastOrder, thunkGetCart} from "../../store/shoppingCart";
// import './orderhistory.css'

function OrderHistory() {
    const dispatch = useDispatch();
    const ordersObj = useSelector(state => state.shoppingCart.orders);
    const orders = Object.values(ordersObj);
    const [reorderQuantities, setReorderQuantities] = useState({});
    const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);

    useEffect(() => {
        dispatch(thunkGetPastOrders());
    }, [dispatch]);

    const handleReorderQuantityChange = (productId, quantity) => {
        setReorderQuantities(prev => ({ ...prev, [productId]: quantity }));
    };

    const handleReorder = async (orderId, items) => {
        const quantities = {};
        console.log(items)
        items.forEach(item => {
            quantities[item.product_id] = reorderQuantities[item.product_id] || item.quantity;
        });
        await dispatch(thunkReorderPastOrder(orderId, quantities));
        await dispatch(thunkGetCart());

        setShowAddedToCartMsg(true);
        setTimeout(() => {
            setShowAddedToCartMsg(false);
        }, 3000);
    };

    return (
        <div>
            <h2>Your Order History</h2>
            {showAddedToCartMsg && <div className="added-to-cart-msg">Added to the cart!</div>}
            {orders && orders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <div>
                    {orders.map(order => (
                        <div key={order.id}>
                            <p>Timestamp: {order.timestamp}</p>
                            <p>Total: ${order.total_amount}</p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.product_id}>
                                        <strong>{item.product_name}</strong>
                                        <br />
                                        Quantity:
                                        <input
                                            type="number"
                                            defaultValue={item.quantity}
                                            onChange={(e) => handleReorderQuantityChange(item.product_id, parseInt(e.target.value))}
                                        />
                                        <br />
                                        Single Price: ${item.price_at_time_of_purchase}
                                        <br />
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleReorder(order.id, order.items)}>
                                Reorder this Order
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default OrderHistory;
