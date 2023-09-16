// Constants
const SET_USER_REVIEWS = "reviews/SET_USER_REVIEWS";
const SET_PRODUCT_REVIEWS = "reviews/SET_PRODUCT_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

// Action Creators
const setUserReviews = (reviews) => ({
  type: SET_USER_REVIEWS,
  reviews,
});

const setProductReviews = (reviews) => ({
  type: SET_PRODUCT_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

// Thunks
export const fetchUserReviews = (userId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/user/${userId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(setUserReviews(reviews));
  }
};

export const fetchProductReviews = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(setProductReviews(reviews));
  }
};

export const createReviewThunk = (productId, formData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${productId}`, {
    method: "POST",
    body: formData,
    credentials: 'include'
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.errors) {
      const formErrors = Object.values(data.errors).flat();
      throw new Error(formErrors.join("\n"));
    }
    throw new Error(data.message || "Failed to create the review.");
  }
  dispatch(addReview(data));
};

export const updateReviewThunk = (reviewId, reviewData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update the review.");
  }

  const updatedReview = await response.json();
  dispatch(updateReview(updatedReview));
};

export const deleteReviewByIdThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete the review.");
  }

  dispatch(removeReview(reviewId));
};

// Reducer
const initialState = {
    allReviews: {},
    userReviews: {},
    productReviews: {},
};

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_REVIEWS:
            const userReviewsObj = {};
            action.reviews.forEach(review => {
                userReviewsObj[review.id] = review;
            });
            return { ...state, userReviews: userReviewsObj };

        case SET_PRODUCT_REVIEWS:
            const productReviewsObj = {};
            action.reviews.forEach(review => {
                productReviewsObj[review.id] = review;
            });
            return { ...state, productReviews: productReviewsObj };

        case ADD_REVIEW:
            return {
                ...state,
                allReviews: {
                    ...state.allReviews,
                    [action.review.id]: action.review
                }
            };

        case UPDATE_REVIEW:
            return {
                ...state,
                allReviews: {
                    ...state.allReviews,
                    [action.review.id]: action.review
                }
            };

        case REMOVE_REVIEW:
            const newState = { ...state };
            delete newState.allReviews[action.reviewId];
            return newState;

        default:
            return state;
    }
}
