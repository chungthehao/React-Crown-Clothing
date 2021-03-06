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

// Allow us to take that user auth object that we got back from our authentication library and then store inside of our database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // Chỉ lưu vô db khi user sign in (lúc sign out thì userAuth là null)
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get();
  // console.log(collectionSnapshot.docs.map(doc => doc.data()));

  if (!snapShot.exists) {
	// Nếu chưa tồn tại trg db thì add vô
	const { displayName, email } = userAuth;
	const createdAt = new Date();

	try {
	  await userRef.set({ displayName, email, createdAt, ...additionalData });
	} catch (error) {
	  console.error('Error creating user', error.message);
	}
  }

  return userRef; // Có thể cần dùng sau này
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // Để đảm bảo 1 là lưu đúng & đầy đủ, 2 là ko lưu gì cả (dùng batch right [ ~ transaction ])
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc(); // Kêu Firebase đưa mình 1 docRef mới (tự tạo random id) ở collection này
      // console.log(newDocRef);

      batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    });

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

// Mình đang 'mimicking' chức năng mà có thể gặp phải khi dùng backend ko phải là Firebase
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth(); // Chỗ nào cần thông tin auth sẽ import nó
export const firestore = firebase.firestore(); // Chỗ nào cần thông tin firestore sẽ import nó

// * Setup our Google authentication utility
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Always trigger the Google popup when ever we use this Google provider for authentication and sign in
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Có thể có Twitter,... nhưng ở đây mình muốn Google, nên đưa provider Google vô
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
// * End: Setup our Google authentication utility

export default firebase; // export trước, in case we want the whole library
