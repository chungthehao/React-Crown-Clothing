import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
