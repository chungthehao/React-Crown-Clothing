import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// 'Provider': 1 component giúp mình access store, reducer (the parent of everything inside of our app, để thằng nào cũng access đc)
// We'll be able to give the redux context to the rest of the app (can dispatch action to that store, pull values off of the store into our components)
import { Provider } from 'react-redux';

import store from './redux/store';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
