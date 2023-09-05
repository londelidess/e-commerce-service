// import { fetchReviews } from "../../store/review";
// import DeleteReviewFormModal from "../Review/DeleteReviewFormModal";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import PostReviewFormModal from "../Review/PostReviewFormModal";

// const { singleProduct: product } = useSelector((state) => state.products);
//   const reviews = useSelector((state) => state.reviews.spot);
//   const userHasReview =
//     currentUser && reviews?.find((review) => review.userId === currentUser.id);
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/product";
import { thunkAddToCart, thunkGetCart } from "../../store/shoppingCart";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddedToCartModal from "./AddedToCartModal";
import {
  fetchFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../store/favorite";
import "./products.css";

const ProductShow = () => {
  const { productId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const favorites = useSelector((state) => state.favorites);
  // console.log(favorites)
  const [isFavorite, setIsFavorite] = useState(false);
  const product = useSelector((state) => state.products.singleProduct);

useEffect(() => {
    setIsFavorite(!!favorites.find((favorite) => favorite.id === productId));
}, [favorites, productId]);


  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      if (isMounted) setIsLoading(true);
      try {
        await dispatch(fetchProductById(productId));
        if (isMounted) setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        if (isMounted) {
          setIsLoading(false);
          setError(err);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
}, [dispatch, productId]);

const handleFavoriteButtonClick = (e) => {
  e.preventDefault();
  if (isFavorite) {
    dispatch(removeProductFromFavorites(productId));
} else {
    dispatch(addProductToFavorites(productId));
}
setIsFavorite(!isFavorite);
};

  const handleAddItemToCart = () => {
    dispatch(thunkAddToCart(productId, Number(quantity)));
    dispatch(thunkGetCart());
  };

  if (isLoading) return <div className="centered">Loading...</div>;
  if (error)
    return <div className="centered">An error occurred: {error.message}</div>;
  if (!product) return null;

  return (
    <div className="detailed-page">
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
              <OpenModalMenuItem
                itemText="Add to Cart"
                modalComponent={<AddedToCartModal />}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductShow;
