import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // HOC, mofify our component to have access to things related to redux

import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>

    <div className='options'>
      <Link to='/shop' className='option'>
        SHOP
      </Link>
      <Link to='/shop' className='option'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/sign-in'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>

    {hidden ? null : <CartDropdown />}
  </div>
);

// Tên hàm 'mapStateToProps' có thể là bất cứ gì (tên này hợp lý r)
// Đầu vào là state object (root reducer)
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  // tên key 'currentUser' là cái prop sẽ pass vô component
  // value: là cái sẽ truy xuất vô store redux, xuất phát từ root reducer
  hidden: state.cart.hidden
});

export default connect(mapStateToProps)(Header);
// export default Header;
