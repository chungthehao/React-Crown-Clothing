import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess
} from "./user.actions";
import {auth, createUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();

    yield put(signInSuccess({
      id: userSnapshot.id,
      ...userSnapshot.data()
    }));
  } catch(err) {
    yield put(signInFailure(err));
  }
}

export function* signInWithGoogle() {
  try {
   const { user: userAuth } = yield auth.signInWithPopup(googleProvider);
   yield getSnapshotFromUserAuth(userAuth);
  } catch(err) {
    yield put(signInFailure(err));
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
    yield put(signInFailure(err));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();

    if (userAuth === null) return; // Chưa sign in / Đã sign out

    yield getSnapshotFromUserAuth(userAuth);
  } catch(err) {
    yield put(signInFailure(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch(err) {
    yield put(signOutFailure(err));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    // Tạo user (& tự sign in sau tạo luôn, Firebase làm) với firebase authentication
    const { user: userAuth } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );

    yield put(signUpSuccess({ userAuth, additionalData: { displayName } }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* signInAfterSignUp({ payload: { userAuth, additionalData } }) {
  yield getSnapshotFromUserAuth(userAuth, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  // Chạy đồng thời all các saga này
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}