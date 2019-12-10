import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = WrappedComponent => {
  // A functional 'Spinner' component
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : <WrappedComponent { ...otherProps } />
  };

  return Spinner; // trả về 1 component
};

export default WithSpinner;