//Constants
export const SET_CART = "shoppingcart/SET_CART";
export const ADD_TO_CART = "shoppingcart/ADD_TO_CART";
export const CLEAR_CART = "shoppingcart/CLEAR_CART";
export const REMOVE_FROM_CART = "shoppingcart/REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "shoppingcart/UPDATE_CART_ITEM_QUANTITY";
export const CHECKOUT = "shoppingcart/CHECKOUT";
export const REORDER_PAST_ORDER = "shoppingcart/REORDER_PAST_ORDER";
export const SET_ORDERS = "shoppingcart/SET_ORDERS";

//Action Creators
export const setCartAction = (cartItems) => ({
    type: SET_CART,
    payload: cartItems
});

export const addToCartAction = (item) => ({
    type: ADD_TO_CART,
    payload: item
});

export const clearCartAction = () => ({
    type: CLEAR_CART
});

export const removeFromCartAction = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const updateCartItemQuantityAction = (productId, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { productId, quantity }
});

export const checkoutAction = () => ({
    type: CHECKOUT
});

export const reorderPastOrderAction = (reorderedItems) => ({
    type: REORDER_PAST_ORDER,
    payload: reorderedItems
});

export const setOrdersAction = (orders) => ({
    type: SET_ORDERS,
    payload: orders
});

//Thunks
export const thunkGetCart = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/`);
        const data = await response.json();
        dispatch(setCartAction(data));
    } catch (error) {
        console.error(error);
    }
};

export const thunkAddToCart = (productId, quantity) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId, quantity })
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(addToCartAction(data));
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};

export const thunkClearCart = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/clear`, {
            method: "DELETE"
        });
        if (response.ok) {
            dispatch(clearCartAction());
        }
    } catch (error) {
        console.error(error);
    }
};


export const thunkRemoveFromCart = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/${productId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            dispatch(removeFromCartAction(productId));
        }
    } catch (error) {
        console.error(error);
    }
};

export const thunkUpdateCartItemQuantity = (productId, newQuantity) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(updateCartItemQuantityAction(productId, newQuantity));
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};

export const thunkCheckout = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/checkout`, {
            method: "POST"
        });

        if (response.ok) {
            dispatch(checkoutAction());
        } else {
            const data = await response.json();
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};

export const thunkReorderPastOrder = (orderId, quantities) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/orders/${orderId}/reorder`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: quantities })
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(reorderPastOrderAction(data.reordered_items));
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
};

export const thunkGetPastOrders = () => async (dispatch) => {
    try {
        const response = await fetch(`/api/shoppingcarts/orders`);
        const data = await response.json();
        dispatch(setOrdersAction(data));
    } catch (error) {
        console.error(error);
    }
};

//Reducer
const initialState = {
    cart: {},
    orders: {}
};

export default function shoppingCartReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: { ...action.payload }
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload.product_id]: action.payload
                }
            };
        case CLEAR_CART:
            return {
                ...state,
                cart: {}
            };
        case REMOVE_FROM_CART:
            const { [action.payload]: removedItem, ...remainingItems } = state.cart;
            return {
                ...state,
                cart: remainingItems
            };

        case UPDATE_CART_ITEM_QUANTITY:
            const updatedCart = { ...state.cart };
            if (updatedCart[action.payload.productId]) {
                updatedCart[action.payload.productId].quantity = action.payload.quantity;
            }
            return {
                ...state,
                cart: updatedCart
            };

        case CHECKOUT:
            return {
                ...state,
                cart: {}
            };
        case REORDER_PAST_ORDER:
            const reorderedCart = { ...state.cart };
            action.payload.forEach(item => {
                reorderedCart[item.product_id] = item;
            });
            return {
                ...state,
                cart: reorderedCart
            };
        case SET_ORDERS:
            return {
                ...state,
                orders: { ...action.payload }
            };
        default:
            return state;
    }
};
