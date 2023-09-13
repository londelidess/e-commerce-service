import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ClearCartModal from "./ClearCartModal";
import { FaX } from 'react-icons/fa6';
import {
  thunkGetCart,
  thunkRemoveFromCart,
  thunkUpdateCartItemQuantity,
} from "../../store/shoppingCart";
import { Redirect } from "react-router-dom";
import CheckoutCartModal from "./CheckoutCartModal";
import PacmanLoading from "../Loading";
import "./shoppingcart.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);
  const sessionUser = useSelector((state) => state.session.user);
  const [quantities, setQuantities] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // const [checkout, setCheckout] = useState(false);
  // console.log(Object.values(cart))
  useEffect(() => {
    dispatch(thunkGetCart());
  }, [dispatch]);

  useEffect(() => {
    const updatedQuantities = {};
    Object.values(cart).forEach((item) => {
      updatedQuantities[item.product_id] = item.quantity;
    });
    setQuantities(updatedQuantities);
  }, [cart]);

  const handleQuantityChange = (e, productId) => {
    const updatedQuantities = {
      ...quantities,
      [productId]: parseInt(e.target.value),
    };
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
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (userConfirmed) {
      setDeleting(true);
      await dispatch(thunkRemoveFromCart(productId));
      await dispatch(thunkGetCart());
      setDeleting(false);
    }
  };

  if (!sessionUser) return <Redirect to="/" />;
  // if (updating) return <div className="centered">Whoop!! Whoop!!</div>;
  // if (deleting) return <div className="centered">Bye Bye!!</div>;
  if (updating || deleting) return <PacmanLoading />;
  return (
    <div className="cart-container">
        <h2>Your Toy Box</h2>
        {cart?.items?.length === 0 ? (
            <p>You can fill your toy box as much as you wish!</p>
        ) : (
            <div>
                <ul>
                    {cart?.items?.map((item) => (
                        <li key={item.product_id} className="cart-item">
                            <button className="remove-cart-item-button" onClick={() => handleRemoveFromCart(item.product_id)}><FaX /></button>
                            <div className="product-preview" title={item.name}>
                                {item.product_image.endsWith("mp4") ? (
                                    <video controls width="320" height="240">
                                        <source src={item.product_image} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={item.product_image} alt={item.name} />
                                )}
                            </div>
                            <div className="product-details">
                                <h2>{item.product_name}</h2>
                                <br />
                                Quantity:
                                <input
                                    type="number"
                                    className="quantity-input"
                                    value={quantities[item.product_id] || item.quantity}
                                    onChange={(e) => handleQuantityChange(e, item.product_id)}
                                />
                                <button className="update-cart-item-button" onClick={() => handleUpdateQuantity(item.product_id)}>Update</button>
                                <div className="price-details">
                                    Single Price: ${item["single-price"]}
                                    <br />
                                    Total Price: ${item.total_price}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="cart-summary">
                  <h3 className="order-summary">Order Summary</h3>
                    <p>
                        <strong>Subtotal:</strong> ${cart.subtotal}
                    </p>
                    <p>
                        <strong>Total Items:</strong> {cart.total_quantity}
                    </p>
                </div>
                <div className="cart-finalize-button-container">
                <div className="delete-button-for-cart-product">
                    <OpenModalMenuItem
                        itemText="Clear Cart Items"
                        modalComponent={<ClearCartModal />}

                    />
                </div>
                <div className="checkout-button-container">
                    <OpenModalMenuItem
                        itemText="Proceed to Checkout"
                        modalComponent={<CheckoutCartModal />}

                    />
                </div>
                </div>
            </div>
        )}
    </div>
);
}
export default ShoppingCart;
