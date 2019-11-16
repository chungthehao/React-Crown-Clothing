import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCbYdTPrEHVnkJYDxvkftsuT0CQ0gkHjXs',
  authDomain: 'crwn-db-7c56e.firebaseapp.com',
  databaseURL: 'https://crwn-db-7c56e.firebaseio.com',
  projectId: 'crwn-db-7c56e',
  storageBucket: 'crwn-db-7c56e.appspot.com',
  messagingSenderId: '387698918281',
  appId: '1:387698918281:web:ed36c974b4c45c77661758',
  measurementId: 'G-EE4EYJBWQJ'
};

firebase.initializeApp(config);

export const auth = firebase.auth(); // Chỗ nào cần thông tin auth sẽ import nó
export const firestore = firebase.firestore(); // Chỗ nào cần thông tin firestore sẽ import nó

// * Setup our Google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();

// Always trigger the Google popup when ever we use this Google provider for authentication and sign in
provider.setCustomParameters({ prompt: 'select_account' });

// Có thể có Twitter,... nhưng ở đây mình muốn Google, nên đưa provider Google vô
export const signInWithGoogle = () => auth.signInWithPopup(provider);
// * End: Setup our Google authentication utility

export default firebase; // export trước, in case we want the whole library
