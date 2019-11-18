const INITIAL_STATE = {
  currentUser: null
};

// Nếu state là 'undefined', thì cũng có giá trị đầu để xài
// Nếu state là 'null' thì cũng coi là có value nha! Ko có gtrị đầu xài?!
// Action nào fire cũng trigger reducer hết (cho dù action.type ko lquan) -> lúc nào cũng cần thằng default để xứ lý những cases đó
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
