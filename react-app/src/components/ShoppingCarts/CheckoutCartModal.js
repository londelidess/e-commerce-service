import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetCart, thunkCheckout } from "../../store/shoppingCart";

function CheckoutCartModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  // const product = useSelector((state) => state.products.singleProduct);
  // console.log(product)

  const handleCheckout = async () => {
    await dispatch(thunkCheckout());
    await dispatch(thunkGetCart());
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-product-confirmation-container">
    <h1 className="delete-product-confirmation-title">Confirm Checkout</h1>
    <h2 className="delete-product-confirmation-text">You're One Step Away from Joy!</h2>
    {sessionUser && (
        <div className="delete-product-confirmation-button-container">
            <button onClick={handleCheckout} className="delete-button">
                Yes (Checkout Products in Cart)
            </button>
            <button onClick={handleCancel} className="cancel-button">
                No (Keep Products in Cart)
            </button>
        </div>
    )}
</div>
);
}

export default CheckoutCartModal;
