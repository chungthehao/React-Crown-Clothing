import React from 'react';


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
      return <div>Something went wrong...</div>
    }

    // Nếu ko có error, show cái children (đc gói trong ErrorBoundary) bình thường
    return this.props.children;
  }

}

export default ErrorBoundary;