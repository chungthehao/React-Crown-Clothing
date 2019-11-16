import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-&-sign-up/sign-in-&-sign-up.component';
import { auth } from './firebase/firebase.utils';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubcribeFromAuth = null;

  componentDidMount() {
    // - Open subscription (an open messaging system) between our app & our firebase at whenever any changes occur on firebase from any source related to this app
    // We don't actually have to manually fetch every time we want to check if that status changed.
    this.unsubcribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
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
}

export default App;
