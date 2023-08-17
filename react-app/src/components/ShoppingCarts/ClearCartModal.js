import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetCart, thunkClearCart } from "../../store/shoppingCart";
import { thunkDeleteMedia } from "../../store/media";

function ClearCartModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  // const product = useSelector((state) => state.products.singleProduct);
  // console.log(product)

  const handleDelete = async () => {

    await dispatch(thunkClearCart())
    await dispatch(thunkGetCart())
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-product-confirmation-container">
    <h1 className="delete-product-confirmation-title">Confirm Delete</h1>
    <h2 className="delete-product-confirmation-text">Are you sure you want to remove this toy from your toy box?</h2>
    {sessionUser && (
        <div className="delete-product-confirmation-button-container">
            <button onClick={handleDelete} className="delete-button">
                Yes (Clear Products in Cart)
            </button>
            <button onClick={handleCancel} className="cancel-button">
                No (Keep Products in Cart)
            </button>
        </div>
    )}
</div>
);
}

export default ClearCartModal;
