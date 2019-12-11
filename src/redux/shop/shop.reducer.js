// import SHOP_DATA from './shop.data';
import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null, // SHOP_DATA
  isFetching: false,
  errorMessage: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCHING_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCHING_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: action.payload,
        isFetching: false,
      };
    case ShopActionTypes.FETCHING_COLLECTIONS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default shopReducer;
