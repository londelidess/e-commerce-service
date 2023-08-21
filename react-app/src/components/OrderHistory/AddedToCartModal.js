import React, {  useEffect } from "react";
import { useModal } from "../../context/Modal";
import "./orderhistory.css";

function AddedToCartModal() {
    const { closeModal } = useModal();

    useEffect(() => {
      const timer = setTimeout(() => {
        closeModal();
      },1500);

      return () => clearTimeout(timer);
    }, [closeModal]);

    return (
        <div className="added-to-cart-modal">
            <span className="add-cart-emoji">🎉</span>
            <p>Yay! Your item's in the cart!</p>
            <span className="add-cart-emoji">🎉</span>
        </div>
    )
}

export default AddedToCartModal;
