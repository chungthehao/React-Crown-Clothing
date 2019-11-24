import { createSelector } from 'reselect';

// - 2 types of selectors: an input selector (doesn't use createSelector), an output selector (does use input selectors & createSelector)

const selectCart = state => state.cart; // From whole reducer state to piece of it

// Nhờ createSelector --> selectCartItems trở thành memoir selector
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => {
    wait(100); // expensive calc
    return cartItems.reduce((accumulatedQuantity, cartItem) => {
      return accumulatedQuantity + cartItem.quantity;
    }, 0);
  }
);

const wait = ms => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) {
    console.log('-----EXPENSIVE_CALC-----');
    now = Date.now();
  }

  return 1; //Math.random(1, 10);
};
