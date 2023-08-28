// constants
const SET_FAVORITES = "favorites/SET_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";

// action creators
const setFavorites = (favorites) => ({
	type: SET_FAVORITES,
	payload: favorites,
});

const addFavorite = (favorite) => ({
	type: ADD_FAVORITE,
	payload: favorite,
});

const removeFavorite = (productId) => ({
	type: REMOVE_FAVORITE,
	payload: productId,
});


// thunks
export const fetchFavorites = () => async (dispatch) => {
    try {
      const response = await fetch("/api/favorites/my-favorites", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const favorites = await response.json();
      dispatch(setFavorites(favorites));
    } catch (error) {
      console.error(error);
    }
  };

export const addProductToFavorites = (productId) => async (dispatch) => {
	const response = await fetch(`/api/favorites/${productId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addFavorite(data));
	} else {
		const data = await response.json();
		console.error("Error adding to favorites:", data.message);
	}
};

export const removeProductFromFavorites = (productId) => async (dispatch) => {
	const response = await fetch(`/api/favorites/${productId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		dispatch(removeFavorite(productId));
	} else {
		const data = await response.json();
		console.error("Error removing from favorites:", data.message);
	}
};

const initialState = {};

// reducer
export default function favoriteReducer(state = initialState, action) {
	switch (action.type) {
		case SET_FAVORITES:
			const favoritesObj = {};
			action.payload.forEach(favorite => {
				favoritesObj[favorite.product_id] = favorite;
			});
			return favoritesObj;
		case ADD_FAVORITE:
			return { ...state, [action.payload.product_id]: action.payload };
		case REMOVE_FAVORITE:
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		default:
			return state;
	}
}
