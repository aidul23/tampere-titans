import * as React from 'react';

// Example of an error logging service function (you can implement your own)
const logErrorToMyService = (error, componentStack) => {
  // Log error to a service or console
  console.error("Logging error:", error, componentStack);
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // State to track if an error has occurred
  }

  // This lifecycle method is invoked when an error is thrown
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  // This lifecycle method is invoked after an error is thrown
  componentDidCatch(error, info) {
    // Log error to a service (you can replace it with your own service)
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI when an error is caught
      return this.props.fallback || <h1>Something went wrong!</h1>; // Default fallback UI
    }

    // If no error occurred, render the children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
