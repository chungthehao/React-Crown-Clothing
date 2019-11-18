import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// 'Provider': 1 component giúp mình access store, reducer (the parent of everything inside of our app, để thằng nào cũng access đc)
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
