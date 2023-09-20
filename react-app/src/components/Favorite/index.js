import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaRegTrashCan } from 'react-icons/fa6';
import {
  fetchFavorites,
  removeProductFromFavorites,
} from "../../store/favorite";
import {PacmanLoading} from '../Loading';
import "./favorite.css"


function Favorite() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
//   const favoritesObj = useSelector((state) => state.favorites);
  const favorites = useSelector((state) => state.favorites);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemove = async (productId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this item from your favorites?"
    );
    if (userConfirmed) {
      setDeleting(true);
      await dispatch(removeProductFromFavorites(productId));
      await dispatch(fetchFavorites());
      setDeleting(false);
    }
  };

  if (!sessionUser) return <Redirect to="/" />;
//   if (deleting) return <div className="centered">Removing...</div>;
  if (deleting) return <PacmanLoading />;

//   console.log(favoritesObj);
//   const favorites = Object.values(favoritesObj);
//   console.log(favorites);
return (
    <div className="favorites-container">
        <h2>Your Favorites</h2>
        {favorites.length === 0 && <p>No favorites yet.</p>}
        <div>
            <ul>
                {favorites.map((product) => (
                    <li key={product.id} className="favorite-item">
                        <button
                            className="remove-favorite-item-button"
                            onClick={() => handleRemove(product.id)}
                        >
                        <FaRegTrashCan />
                        </button>
                        <div className="product-preview" title={product.name}>
                            {product.images && product.images.length > 0 ? (
                                product.images[0].media_url.endsWith("mp4") ? (
                                    <video controls width="320" height="240">
                                        <source src={product.images[0].media_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={product.images[0].media_url} alt={product.name} />
                                )
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <div className="price-details">
                                Price: ${product.price}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
}
export default Favorite;
