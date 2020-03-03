import React from 'react'

import Spinner from "../spinner/spinner.component";

const WithSpinner = WrappedComponent => {
  // A functional 'SpinnerOrWrappedComponent' component
  const SpinnerOrWrappedComponent = ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent { ...otherProps } />
  };

  return SpinnerOrWrappedComponent; // trả về 1 component
};

export default WithSpinner;