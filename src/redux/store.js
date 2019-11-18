import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // dễ debug redux code

import rootReducer from './root-reducer';

// https://redux.js.org/recipes/configuring-your-store#the-solution-configurestore
const middlewares = [logger]; // Để trg array để ko cần biết là mình xài bao nhiều middlewares thì code ở dưới cũng ko đổi, spread array ra thôi

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;