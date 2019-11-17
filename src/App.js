import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Switch component đảm bảo tìm được 1 Route match là ko tìm nữa

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-&-sign-up/sign-in-&-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
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
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // - userAuth = null khi sign out (hoặc khi chưa sign in)
      if (userAuth) {
        // Lưu user vô firestore (nếu chưa exists) sau khi login (bằng Google hoặc bằng email-password)
        const userRef = await createUserProfileDocument(userAuth);

        // - Listen to this userRef for any changes to that data
        // - We'll also get back the 1st state of that data
        userRef.onSnapshot(snapshot => {
          // Đảm bảo data set vô local state là data chính xác lưu trg firestore
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth }); // userAuth đang là null
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
        <Header currentUser={this.state.currentUser} />

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
