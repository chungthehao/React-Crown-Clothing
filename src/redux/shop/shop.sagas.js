import { takeEvery, call, put } from 'redux-saga/effects';

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

// A generator func that does the async code that we want it to do
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');

    /**
     * 'yield' is like 'await', but also pause the execution of the function.
     *
     * This says: Wait of collectionRef.get() to complete, store it in the 'snapshot' const and pause the func until .next() is called.
     */
    const snapshot = yield collectionRef.get();

    /**
     * Because it could potentially take a while before this method is completed we use the 'call' func.
     * This takes a function as the 1st param and the functions own params as subsequent params.
     *
     * Because we use 'call' it's possible to use yield on the func and therefor use it in the saga.
     */
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    /**
     * This is like the redux 'dispatch' func, only because this uses sagas it has its own keyword called 'put'.
     *
     * 'put' dispatches an action & a payload to the reducer.
     */
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionsFailure(err.message));
  }
}

export function* fetchCollectionsStart() {
  // - Trigger more code to run depending on an action type
  // - takeEvery: create non-blocking call in order to not stop our app to continue running
  // either other sagas or whatever the user wants to do
  yield takeEvery(
    ShopActionTypes.FETCHING_COLLECTIONS_START,
    fetchCollectionsAsync
  );

}