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
export const SignInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

// After the sign in process fails, anything goes wrong
export const SignInFailure = err => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: err
});