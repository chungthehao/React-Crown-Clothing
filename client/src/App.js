import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import CheckoutPage from './pages/checkout/checkout.component';
// import SignInAndSignUpPage from './pages/sign-in-&-sign-up/sign-in-&-sign-up.component';
import Header from './components/header/header.component';
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import './App.css';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-&-sign-up/sign-in-&-sign-up.component'));

const App = ({ currentUser, checkUserSession }) => {
  // App mình mới chạy thì check liền coi thử coi user session có đâu đó chưa?
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />

      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </ErrorBoundary>
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
