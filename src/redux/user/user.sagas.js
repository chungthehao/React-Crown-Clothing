import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {SignInFailure, SignInSuccess} from "./user.actions";
import {auth, createUserProfileDocument, googleProvider} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();

    yield  put(SignInSuccess({
      id: userSnapshot.id,
      ...userSnapshot.data()
    }));
  } catch(err) {
    yield put(SignInFailure(err));
  }
}

export function* signInWithGoogle() {
  try {
   const { user: userAuth } = yield auth.signInWithPopup(googleProvider);
   yield getSnapshotFromUserAuth(userAuth);
  } catch(err) {
    yield put(SignInFailure(err));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail(action) {
  const { payload: { email, password } } = action;

  try {
    const { user: userAuth } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(userAuth);
  } catch(err) {
    yield put(SignInFailure(err));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  // Chạy đồng thời all các saga này
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}