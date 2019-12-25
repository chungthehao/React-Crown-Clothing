import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';
import {
  emailSignInStart,
  googleSignInStart
} from '../../redux/user/user.actions';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Trigger saga
    emailSignInStart(email, password);
  };

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password.</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={e => setEmail(e.target.value)}
          label='Email'
          required
        />

        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={e => setPassword(e.target.value)}
          label='Password'
          required
        />

        <div className='buttons'>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            {' '}
            Sign in with Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);

// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: ''
//     };
//   }

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = async event => {
//     event.preventDefault();
//     const { email, password } = this.state;
//     const { emailSignInStart } = this.props;

//     // Trigger saga
//     emailSignInStart(email, password);
//   };

//   render() {
//     const { googleSignInStart } = this.props;

//     return (
//       <div className='sign-in'>
//         <h2 className='title'>I already have an account</h2>
//         <span>Sign in with your email and password.</span>

//         <form onSubmit={this.handleSubmit}>
//           <FormInput
//             type='email'
//             name='email'
//             value={this.state.email}
//             handleChange={this.handleChange}
//             label='Email'
//             required
//           />

//           <FormInput
//             type='password'
//             name='password'
//             value={this.state.password}
//             handleChange={this.handleChange}
//             label='Password'
//             required
//           />

//           <div className='buttons'>
//             <CustomButton type='submit'> Sign in </CustomButton>
//             <CustomButton
//               type='button'
//               onClick={googleSignInStart}
//               isGoogleSignIn
//             >
//               {' '}
//               Sign in with Google{' '}
//             </CustomButton>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
