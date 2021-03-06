import React from 'react';
import { connect } from 'react-redux'; // HOC, mofify our component to have access to things related to redux
import { createStructuredSelector } from 'reselect';

// import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";

const Header = ({ currentUser, hidden, signOutStart }) => (
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
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
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

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
