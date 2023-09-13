// Constants
const SET_ALL_PRODUCTS = "products/SET_ALL_PRODUCTS";
const SET_USER_PRODUCTS = "products/SET_USER_PRODUCTS";
const SET_PRODUCT = "products/SET_PRODUCT";
const ADD_PRODUCT = "products/ADD_PRODUCT";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";

// Action Creators
const setProducts = (products) => ({
  type: SET_ALL_PRODUCTS,
  products,
});

const setUserProducts = (products) => ({
  type: SET_USER_PRODUCTS,
  products,
});


const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  productId,
});

// Thunks
export const fetchAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
  if (response.ok) {
    const products = await response.json();
    dispatch(setProducts(products));
  }
};

export const fetchUserProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/user");
  if (response.ok) {
    const products = await response.json();
    dispatch(setUserProducts(products));
  }
};

export const fetchProductById = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);
  if (response.ok) {
    const product = await response.json();
    // console.log('fetchProductById res in thunk',product)
    dispatch(setProduct(product));
    return product;
  }
};

// const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrf_token='));
// const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : null;
export const createProductThunk = (productData) => async (dispatch) => {
  const response = await fetch("/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "X-CSRFToken": csrfToken
    },
    body: JSON.stringify(productData),
    credentials: 'include'
  });

  const data = await response.json();
  console.log("This is post returning data from thunkCreate", data);

  if (!response.ok) {

    if (data.errors) {
      const formErrors = Object.values(data.errors).flat();
      throw new Error(formErrors.join("\n"));
    }

    throw new Error(data.message || "Failed to create the product.");
  }
  dispatch(addProduct(data));
  return data.id
};

export const updateProductThunk = (productId, productData) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update the product.");
  }

    const updatedProduct = await response.json();
    dispatch(updateProduct(updatedProduct));

};

export const deleteProductByIdThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete the product.");
  }

    dispatch(removeProduct(productId));

};

// Reducer
const initialState = {
  allProducts: {},
  userProducts: [],
  singleProduct: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      const allProducts = {};
      action.products.forEach((product) => {
        allProducts[product.id] = product;
      });
      return { ...state, allProducts };

    case SET_USER_PRODUCTS:
      return { ...state, userProducts: action.products };

    case SET_PRODUCT:
      return { ...state, singleProduct: action.product };

    case ADD_PRODUCT:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product
        }
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product
        }
      };

    case REMOVE_PRODUCT:
      const newState = { ...state };
      delete newState.allProducts[action.productId];
      return newState;

    default:
      return state;
  }
}
