import React from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';


class ErrorBoundary extends React.Component {

  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  // Catch error đc throw từ children
  static getDerivedStateFromError(error) {
    // process the error
    return {
      hasErrored: true
    }
  }

   // errorInfo: component nào throw error
  componentDidCatch(error, errorInfo) {
    console.log(error );
  }

  render() {
    if (this.state.hasErrored ) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/qIufhof.png' />
          <ErrorImageText>Sorry this page is broken...</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    // Nếu ko có error, show cái children (đc gói trong ErrorBoundary) bình thường
    return this.props.children;
  }

}

export default ErrorBoundary;