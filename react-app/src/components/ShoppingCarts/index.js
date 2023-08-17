import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ClearCartModal from "./ClearCartModal"
import { thunkGetCart, thunkRemoveFromCart,thunkUpdateCartItemQuantity,thunkCheckout } from "../../store/shoppingCart";
import './shoppingcart.css'

function ShoppingCart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.shoppingCart.cart);
    const [quantities, setQuantities] = useState({});
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        dispatch(thunkGetCart());
    }, [dispatch]);

    useEffect(() => {
        const updatedQuantities = {};
        Object.values(cart).forEach(item => {
            updatedQuantities[item.product_id] = item.quantity;
        });
        setQuantities(updatedQuantities);
    }, [cart]);

    const handleQuantityChange = (e, productId) => {
        const updatedQuantities = { ...quantities, [productId]: parseInt(e.target.value) };
        setQuantities(updatedQuantities);
    };

    const handleUpdateQuantity = async (productId) => {
        setUpdating(true);
        const newQuantity = quantities[productId];
        if (newQuantity && newQuantity !== cart[productId]?.quantity) {
            await dispatch(thunkUpdateCartItemQuantity(productId, newQuantity));
            await dispatch(thunkGetCart());
            setUpdating(false);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        const userConfirmed = window.confirm("Are you sure you want to remove this item from your cart?");
        if (userConfirmed) {
            setDeleting(true);
            await dispatch(thunkRemoveFromCart(productId));
            await dispatch(thunkGetCart());
            setDeleting(false);
        }
    };

    const handleCheckout = async () => {
        await dispatch(thunkCheckout());
    };

    if (updating) return <div className="centered">Whoop!! Whoop!!</div>;
    if (deleting) return <div className="centered">Bye Bye!!</div>;
    return (
        <div>
            <h2>Your Toy Box</h2>
            {cart && Object.values(cart).length === 0 ? (
                <p>You can fill your toy box as much as you wish!</p>
            ) : (
                <div>
                    <ul>
                        {Object.values(cart).map(item => (
                            <li key={item.product_id}>
                                <strong>{item.product_name}</strong>
                                <br />
                                Quantity:
                                <input
                                    type="number"
                                    value={quantities[item.product_id] || item.quantity}
                                    onChange={(e) => handleQuantityChange(e, item.product_id)}
                                />
                                <button onClick={() => handleUpdateQuantity(item.product_id)}>Update</button>
                                <br />
                                Single Price: ${item['single-price']}
                                <br />
                                Total Price: ${item.total_price}
                                <br />
                                <button onClick={() => handleRemoveFromCart(item.product_id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="delete-button-for-product">
                        <OpenModalMenuItem
                            itemText="Clear Cart Items"
                            modalComponent={<ClearCartModal />}
                        />
                    </div>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
}
export default ShoppingCart;
