import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {updateReviewThunk, fetchProductReviews } from "../../store/review";
import { fetchProductById } from "../../store/product";
import PacmanLoading from "../Loading";
import StarRatingInput from "./starRatingInput";
import "./reviews.css";

function UpdateReviewFormModal({ reviewId }) {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const reviewResponse = await dispatch(
      updateReviewThunk(reviewId, { review: comment, stars })
    );

    if (reviewResponse.message) {
      setError(reviewResponse.message);

      return;
    }
    await dispatch(fetchProductById(reviewId));
    await dispatch(updateReviewThunk(reviewId));
    setIsLoading(false);
    closeModal();
  };

  if (!reviewId) return null;

  const isCommentValid = comment.length > 3;
  if (isLoading) return <PacmanLoading />;
  return (
    <>
      <div className="review-form">
        <h1>Give us opinion!</h1>
        {error && <p className="error"> {error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="10"
            cols="60"
          />

          <div className="star-rating-input">
            <div className="star-input-container">
              <StarRatingInput
                rating={stars}
                onChange={(newRating) => setStars(newRating)}
              />
              <h3>Stars</h3>
            </div>
          </div>
          <button
            className={`review-submit-button ${
              !isCommentValid || stars === 0 ? "disabled" : ""
            }`}
            type="submit"
            disabled={!isCommentValid || stars === 0}
          >
            Submit Your Review
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateReviewFormModal;
