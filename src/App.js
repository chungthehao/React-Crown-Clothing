import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-&-sign-up/sign-in-&-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import './App.css';

class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
    // destructure props từ map từ redux vô
    const { setCurrentUser } = this.props;

    // - Open subscription (an open messaging system) between our app & our firebase at whenever any changes occur on firebase from any source related to this app
    // We don't actually have to manually fetch every time we want to check if that status changed.
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // - userAuth = null khi sign out (hoặc khi chưa sign in)
      if (userAuth) {
        // Lưu user vô firestore (nếu chưa exists) sau khi login (bằng Google hoặc bằng email-password). Sau dòng này chắc chắn có user trg firestore và trả về userRef của nó
        const userRef = await createUserProfileDocument(userAuth);

        // - Listen to this userRef for any changes to that data
        // - We'll also get back the 1st state of that data
        userRef.onSnapshot(snapshot => {
          // Đảm bảo data set vô store là data chính xác lưu trg firestore
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(userAuth); // userAuth đang là null
      }
    });
  }

  componentWillUnmount() {
    // Make sure we don't get any memory leaks in our application related to listeners still being open even if the component that cares about the listener is no longer on the page.
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route
            exact
            path='/sign-in'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) //
  // tên key 'setCurrentUser' là cái prop sẽ pass vô component
  // Phần value: what 'dispatch' is it is a way for redux to know whatever you're passing me, whatever object you're passing me is going to be an action object that I'm gonna pass to every reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
