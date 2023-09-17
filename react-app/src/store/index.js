import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer from './product'
import shoppingCartReducer from './shoppingCart'
import mediaReducer from './media'
import favoriteReducer from './favorite'
import reviewsReducer from './review'

const rootReducer = combineReducers({
  session,
  products:productsReducer,
  shoppingCart:shoppingCartReducer,
  medias:mediaReducer,
  favorites:favoriteReducer,
  reviews: reviewsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
