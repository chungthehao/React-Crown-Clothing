import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // HOC, mofify our component to have access to things related to redux
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
// import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import {HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    {/*<Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>*/}

    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionDiv onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionDiv>
      ) : (
        <OptionLink to='/sign-in'>
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>

    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

// Tên hàm 'mapStateToProps' có thể là bất cứ gì (tên này hợp lý r)
// Đầu vào là state object (root reducer)
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)

//   // currentUser: state.user.currentUser,
//   // // tên key 'currentUser' là cái prop sẽ pass vô component
//   // // value: là cái sẽ truy xuất vô store redux, xuất phát từ root reducer
//   // hidden: state.cart.hidden
// });

export default connect(mapStateToProps)(Header);
// export default Header;
