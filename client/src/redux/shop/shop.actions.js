import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCHING_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCHING_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCHING_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// - A action creator that returns a function that gets dispatch in it
// - We can do this because of redux-thunk library
// - If redux-thunk middleware is enabled, any time you attempt to DISPATCH a func instead of an obj,
// the middleware will call that func with dispatch method itself as the 1st argument
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    dispatch(fetchCollectionsStart());

    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

      // Cập nhật vô redux state
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
  }
};