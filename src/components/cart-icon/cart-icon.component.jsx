import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import './cart-icon.styles.scss';

const CartIcon = props => (
  <div className='cart-icon' onClick={props.toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{props.itemCount}</span>
  </div>
);

const mapStateToProps = state => {
  // sign-in, sign-out, toggle cart dropdown cũng gọi nữa?! --> Vì switch case return a brand new state obj
  // Mặc cho CartIcon này chỉ qtâm cartItems thôi
  // This is not good for performance -> we don't wanna re-render our component every time the state changes especially if those state changes don't actually modify the parts of the state that our component cares about
  console.log('I am being called');
  return {
    itemCount: state.cart.cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
  };
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
