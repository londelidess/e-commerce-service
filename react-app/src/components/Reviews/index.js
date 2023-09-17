import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import {
  fetchUserReviews,
} from "../../store/review";
import {PacmanLoading} from "../Loading";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateReviewFormModal from "./UpdateReviewFormModal";
import DeleteReviewFormModal from "./DeleteReviewFormModal";
import "./reviews.css";

function Reviews() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userReviewsObj = useSelector((state) => state.reviews.userReviews);
  const userReviewsArray = Object.values(userReviewsObj);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionUser) {
      setIsLoading(true);
      dispatch(fetchUserReviews(sessionUser.id))
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [dispatch, sessionUser]);


  if (!sessionUser) return <Redirect to="/" />;
  if (isLoading) return <PacmanLoading />;

  return (
    <div className="reviews-container">
      <h2>Your Reviews</h2>
      {userReviewsArray.length === 0 && (
        <p>You haven't written any reviews yet.</p>
      )}
      <div>
        <ul>
          {userReviewsArray.map((review) => (
            <li key={review.id} className="user-review-item">
              <div className="user-review-actions">
                <OpenModalMenuItem
                  itemText={<FaX />}
                  modalComponent={<DeleteReviewFormModal reviewId={review.id} productId={review?.product.id} />}
                />
              </div>
              <div className="user-review-details">
                <h2>{review.product.name}</h2>
                <p>{review.review_text}</p>
                <div className="user-rating-details">{review.rating} stars</div>
                <div className='user-update-review'>
                  <OpenModalMenuItem
                    itemText="Update Your Review"
                    modalComponent={
                      <UpdateReviewFormModal reviewId={review.id} productId={review?.product.id} />
                    }
                  />
                </div>
              </div>
              {review.media_url && (
                review.media_url.endsWith("mp4") ? (
                  <video className="user-review-media" controls>
                    <source src={review.media_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img className="user-review-media" src={review.media_url} alt={`Review for product ${review.product_id}`} />
                )
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
);
}

export default Reviews;
