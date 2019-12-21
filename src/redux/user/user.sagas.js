import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {googleSignInFailure, googleSignInSuccess} from "./user.actions";
import {auth, createUserProfileDocument, googleProvider} from "../../firebase/firebase.utils";

export function* signInWithGoogle() {
  try {
   const { user: userAuth } = yield auth.signInWithPopup(googleProvider);
   const userRef = yield call(createUserProfileDocument, userAuth);
   const userSnapshot = yield userRef.get();

   yield  put(googleSignInSuccess({
     id: userSnapshot.id,
     ...userSnapshot.data()
   }));
  } catch(err) {
    yield put(googleSignInFailure(err))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  // Chạy đồng thời all các saga này
  yield all([
    call(onGoogleSignInStart),
  ]);
}