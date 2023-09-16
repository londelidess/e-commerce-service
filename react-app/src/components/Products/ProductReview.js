import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/review";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewFormModal from "../Reviews/DeleteReviewFormModal";

import { FaX } from "react-icons/fa6";
const ProductReview = ({ review }) => {
    const sessionUser = useSelector((state) => state.session.user);
    // console.log(review)
    return (
        <li className="review-item">
            <div className="review-content">
                <h3 className="review-username">{review.user.username}</h3>
                <p className="review-text">{review.review_text}</p>
                <div className="review-rating">{review.rating} stars</div>

                {sessionUser?.id === review.user.id && (
                <div className="review-actions">
                <OpenModalMenuItem
                  itemText={<FaX />}
                  modalComponent={<DeleteReviewFormModal reviewId={review.id} />}
                />
              </div>
                )}
            </div>
            {review.media_url && (
                review.media_url.endsWith("mp4") ? (
                    <video className="review-media" controls>
                        <source src={review.media_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img className="review-media" src={review.media_url} alt={`Review by ${review.user.username}`} />
                )
            )}
        </li>
    );
}

export default ProductReview;
