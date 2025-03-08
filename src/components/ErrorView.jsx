import React from 'react';

const ErrorView = ({ onRetry }) => {
  return (
    <div className="failure-view-container">
      <h1 className="failure-heading">Something went wrong</h1>
      <p className="failure-description">We are having some trouble processing your request. Please try again.</p>
      <button 
        type="button" 
        className="retry-button"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;
