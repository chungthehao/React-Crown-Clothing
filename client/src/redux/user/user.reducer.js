import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

// Nếu state là 'undefined', thì cũng có giá trị đầu để xài
// Nếu state là 'null' thì cũng coi là có value nha! Ko có gtrị đầu xài?!
// Action nào fire cũng trigger reducer hết (cho dù action.type ko lquan) -> lúc nào cũng cần thằng default để xứ lý những cases đó
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
