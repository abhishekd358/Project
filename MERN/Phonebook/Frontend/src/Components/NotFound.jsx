import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', color:'black', padding: '267px',backgroundColor:'white'}}>
      <h1 style={{ color:'#ff1fa1'}}>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" style={{ color:'#ff1fa1'}}>Go back to Home</Link>
    </div>
  );
};

export default NotFound;
