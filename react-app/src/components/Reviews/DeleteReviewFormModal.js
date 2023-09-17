import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewByIdThunk, fetchProductReviews, fetchUserReviews } from "../../store/review";
import { fetchProductById } from "../../store/product";

function DeleteReviewFormModal({ reviewId, productId }) {
  // function DeleteReviewFormModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = async () => {
    await dispatch(deleteReviewByIdThunk(reviewId));
    // rerendering for reviews
    await dispatch(fetchProductReviews(productId));
    await dispatch(fetchUserReviews(sessionUser.id))
    // rerendering for avgrating
    await dispatch(fetchProductById(productId))
    closeModal();
  };
  console.log('productId',productId)
  // console.log('userId',sessionUser.id)

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="delete-review-confirmation-container">
      <h1 className="delete-review-confirmation-title">Confirm Delete</h1>
      <p className="delete-review-confirmation-text">Are you sure you want to delete this review?</p>
      {sessionUser && (
      <div className="delete-review-confirmation-button-container">
        <button
          className="review-delete-button"
          onClick={handleDelete}
        >
          Yes (Delete Review)
        </button>
        <button
          className="review-delete-cancel-button"
          onClick={handleCancel}
        >
          No (Keep Review)
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteReviewFormModal;
