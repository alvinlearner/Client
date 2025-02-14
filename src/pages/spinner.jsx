// Spinner.jsx
import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner-container py-5">
      <div className="spinner h-35 w-35"></div>
      <p className='ml-2'>Please wait...</p>
    </div>
  );
};

export default Spinner;
