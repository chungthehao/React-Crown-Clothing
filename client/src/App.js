import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-&-sign-up/sign-in-&-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import './App.css';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ currentUser, checkUserSession }) => {
  // App mình mới chạy thì check liền coi thử coi user session có đâu đó chưa?
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/sign-in'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
