import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ErrorPage.css'
const ErrorPage = () => {
  return (
    <div className="error-hero">
      <div className="error-content">
        <h1 className="error-text">404 - Page Not Found</h1>
        <p className='error-description'>
          "Sorry, the page you are looking for does not exist. Please return to the homepage."
        </p>
        <Link to="/" className="error-link">Go Back to Home</Link>
      </div>
      <div className="error-image"></div>
    </div>
  );
};

export default ErrorPage;
