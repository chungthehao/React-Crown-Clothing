import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

// Trigger the actual sign in
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

// After sign in & have the user back
export const googleSignInSuccess = user => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

// After the sign in process fails, anything goes wrong
export const googleSignInFailure = err => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: err
});

// Trigger the actual sign in
export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

// After sign in & have the user back
export const emailSignInSuccess = user => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user
});

// After the sign in process fails, anything goes wrong
export const emailSignInFailure = err => ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: err
});