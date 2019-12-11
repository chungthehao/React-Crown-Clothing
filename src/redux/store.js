import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'; // dễ debug redux code
import { persistStore } from 'redux-persist'; // Allow our browser to actually cache our store
import thunk from "redux-thunk";

import rootReducer from './root-reducer';

// https://redux.js.org/recipes/configuring-your-store#the-solution-configurestore
const middlewares = [thunk]; // Để trg array để ko cần biết là mình xài bao nhiều middlewares thì code ở dưới cũng ko đổi, spread array ra thôi

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

// This 'persistor' is essentially a persisted version of our store
export const persistor = persistStore(store);

// # Sử dụng đồng thời 'persistor' và 'store' để tạo ra 1 new provider đóng gói app của mình
