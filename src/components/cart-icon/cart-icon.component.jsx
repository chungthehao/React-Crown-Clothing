import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  // sign-in, sign-out, toggle cart dropdown cũng gọi nữa?! --> Vì switch case return a brand new state obj
  // Mặc cho CartIcon này chỉ qtâm cartItems thôi
  // This is not good for performance -> we don't wanna re-render our component every time the state changes especially if those state changes don't actually modify the parts of the state that our component cares about
  // console.log('I am being called');
  return {
    // # Khi KHÔNG DÙNG reselect
    // itemCount: (() => {
    //   wait(100); // expensive calc
    //   return state.cart.cartItems.reduce((accumulatedQuantity, cartItem) => {
    //     return accumulatedQuantity + cartItem.quantity;
    //   }, 0);
    // })()

    // # Khi CÓ DÙNG reselect
    itemCount: selectCartItemsCount(state)
  };
};

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
