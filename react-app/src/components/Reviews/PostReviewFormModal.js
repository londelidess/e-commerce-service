import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk, fetchProductReviews  } from "../../store/review";
import { fetchProductById } from "../../store/product";
import { PacmanLoading, ScaleLoading } from '../Loading';
import StarRatingInput from "./starRatingInput";
import "./reviews.css";

function PostReviewFormModal({ productId }) {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("review_text", comment);
      formData.append("rating", stars);
      if (mediaFile) {
          formData.append("media_file", mediaFile);
      }

      const reviewResponse = await dispatch(createReviewThunk(productId, formData));

      if (reviewResponse && reviewResponse.message) {
          setError(reviewResponse.message);
          return;
      }
      await dispatch(fetchProductById(productId));
      await dispatch(fetchProductReviews(productId));
      setIsLoading(false);
      closeModal();
  } catch (error) {
      setError("There was an unexpected error. Please try again.");
      setIsLoading(false);
  }
};

  if (!productId) return null;

  const isCommentValid = comment.length > 3;
  // if (isLoading) return <ScaleLoading height={50} width={6} />;
  console.log("Rendering PostReviewFormModal");
  return (
    <>
      <div className="review-form">
        <h1>Give us Your Opinion!</h1>
        {error && <p className="error"> {error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Please type at least 3 characters..."
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
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .mp4"
            onChange={(e) => setMediaFile(e.target.files[0])}
            />
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

export default PostReviewFormModal;
