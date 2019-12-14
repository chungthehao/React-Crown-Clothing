import { takeEvery } from 'redux-saga/effects';

import ShopActionTypes from "./shop.types";

// A generator func that does the async code that we want it to do
export function* fetchCollectionsAsync() {
  yield console.log('SAGA FIRED');
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