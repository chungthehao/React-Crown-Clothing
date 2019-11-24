import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import './cart-icon.styles.scss';

const CartIcon = props => {
  console.log('CART ICON COMPONENT IS RE-RENDERED!');
  return (
    <div className='cart-icon' onClick={props.toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{props.itemCount}</span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  // # Khi KHÔNG DÙNG reselect
  // itemCount: (() => {
  //   wait(100); // expensive calc
  //   return state.cart.cartItems.reduce((accumulatedQuantity, cartItem) => {
  //     return accumulatedQuantity + cartItem.quantity;
  //   }, 0);
  // })()

  // # Khi CÓ DÙNG reselect
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

const wait = ms => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) {
    console.log('-----EXPENSIVE_CALC-----');
    now = Date.now();
  }
};
