import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-&-sign-up/sign-in-&-sign-up.component';
import './App.css';

function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/sign-in' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
