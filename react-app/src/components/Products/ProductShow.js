// const { singleProduct: product } = useSelector((state) => state.products);

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/product";
import { thunkAddToCart, thunkGetCart } from "../../store/shoppingCart";
import AddedToCartModal from "./AddedToCartModal";
import {
  fetchFavorites,
  checkIsFavorite,
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../store/favorite";
import { fetchProductReviews } from "../../store/review";
import ProductReview from "./ProductReview"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewFormModal from "../Reviews/PostReviewFormModal";
import UpdateReviewFormModal from "../Reviews/UpdateReviewFormModal";
import {PacmanLoading} from "../Loading";
import "./products.css";

const ProductShow = () => {
  const { productId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const productReviewsObj = useSelector((state) => state.reviews.productReviews);
  const productReviewsArray = Object.values(productReviewsObj);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.products.singleProduct);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);


  // console.log(isFavorite)

  useEffect(() => {
    let isMounted = true;

    const fetchProductAndReviews = async () => {
      if (isMounted) setIsLoading(true);
      try {
        await dispatch(fetchProductById(productId));
        await dispatch(fetchProductReviews(productId));
        if (isMounted) setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch product or reviews:", err);
        if (isMounted) {
          setIsLoading(false);
          setError(err);
        }
      }
    };

    fetchProductAndReviews();

    return () => {
      isMounted = false;
    };
  }, [dispatch, productId]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      setIsFavoriteLoading(true);
      try {
        const favorited = await dispatch(checkIsFavorite(productId));
        // console.log("Favorited status from action:", favorited);
        setIsFavorite(favorited);
      } catch (error) {
        console.error("Failed to fetch favorite status:", error);
        setError(error);
      } finally {
        setIsFavoriteLoading(false);
      }
    };

    fetchFavoriteStatus();
  }, [dispatch, productId]);
  // setTimeout(() => setIsLoading(false), 5000);

  const handleFavoriteButtonClick = async (e) => {
    e.preventDefault();
    if (isFavorite) {
      await dispatch(removeProductFromFavorites(productId));
    } else {
      await dispatch(addProductToFavorites(productId));
    }
    setIsFavorite((prev) => !prev);
  };

  const handleAddItemToCart = () => {
    dispatch(thunkAddToCart(productId, Number(quantity)));
    dispatch(thunkGetCart());

    setShowAddedToCartMessage(true);

    setTimeout(() => {
      setShowAddedToCartMessage(false);
    }, 2000);
  };

  const userHasReview = productReviewsArray.some(
    (review) => review.user.id === sessionUser?.id
  );
  const isProductOwner = product.added_by_user_id === sessionUser?.id;

  if (error)
    return <div className="centered">An error occurred: {error.message}</div>;
  // if (isLoading || isFavoriteLoading) return <div className="centered">Loading...</div>;
  if (isLoading || isFavoriteLoading) {
    return <PacmanLoading />;
  }
  if (!product) return null;

  return (
    <div className="detailed-page">
        {showAddedToCartMessage && (
            <div className="added-to-cart-popup">
                <span>✓</span> {quantity} {product.name}
                {quantity == 1 &&
                    <span> has been added to your cart!</span>
                }
                {quantity > 1 &&
                    <span> have been added to your carts!</span>
                }
            </div>
        )}

        <div className="product-main-section">
            {/* Product Image Section */}
            <div className="product-image-section">
                <div className="product-image-container">
                    {product.images[currentImageIndex]?.media_url?.endsWith("mp4") ? (
                        <video controls width="100%" height="100%">
                            <source
                                src={product.images[currentImageIndex]?.media_url}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={product.images[currentImageIndex]?.media_url}
                            alt={product.name}
                            className="product-image"
                        />
                    )}
                </div>
                <div className="preview-images">
                    {product.images.map((image, index) => (
                        <div
                            key={index}
                            className="preview-image"
                            onClick={() => setCurrentImageIndex(index)}
                        >
                            {image.media_url?.endsWith("mp4") ? (
                                <video width="100%" height="100%">
                                    <source src={image.media_url} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={image.media_url}
                                    alt={`${product.name} preview ${index + 1}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Details Section */}
            <div className="product-details">
                <div className="product-header">
                    <h1>{product.name}</h1>
                    {sessionUser && (
                        <button
                            className={`favorite-button ${isFavorite ? "active" : ""}`}
                            onClick={handleFavoriteButtonClick}
                        >
                            <div className="icon">
                                <div className="star"></div>
                            </div>
                            <span>Favorite</span>
                        </button>
                    )}
                </div>
                <div className="product-description">{product.description}</div>
                <div className="product-price">
                    ${parseFloat(product.price).toFixed(2)}
                </div>
                {sessionUser && (
                    <div className="product-order-section">
                        <div className="quantity-section">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                            />
                        </div>
                        <button
                            className="add-to-cart-button"
                            onClick={handleAddItemToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
        <div className="spot-rating-under-detailed-page">
          <i className="fa-solid fa-star"></i>
          {product?.avgRating?.toFixed(1) || "0.0"}
          {productReviewsArray.length > 0 && (
            <p className="reviews-count">
              {"· "}
              {productReviewsArray.length}{" "}
              {productReviewsArray.length === 1 ? "review" : "reviews"}
            </p>
          )}
        </div>
        <div>
          {sessionUser && !userHasReview && !isProductOwner && (
            <div className="post-your-review">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={
                  <PostReviewFormModal productId={productId} />
                }
              />
            </div>
          )}
        </div>
        <div>
          {!productReviewsArray.length && (
            <h3>Be the first to post a review!</h3>
          )}
        </div>
        {productReviewsArray.length > 0 &&
          productReviewsArray.map((review) => (
            <ProductReview review={review} key={review.id} />
          ))}
      </div>
    </div>
  );
};

export default ProductShow;
