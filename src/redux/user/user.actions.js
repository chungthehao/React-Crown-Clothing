import UserActionTypes from './user.types';

// Trigger the actual sign in
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

// Trigger the actual sign in
export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

// After sign in & have the user back
export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

// After the sign in process fails, anything goes wrong
export const signInFailure = err => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: err
});

// Khi app vừa chạy, kiểm tra liền coi xem là user session có persist?
export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutFailure = (err) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: err
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpFailure = (err) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: err
});

export const signUpSuccess = ({ userAuth, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { userAuth, additionalData }
});