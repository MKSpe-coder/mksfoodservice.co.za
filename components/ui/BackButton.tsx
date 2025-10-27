
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    // React Router v6 provides a `key` on the location object. For the initial entry in the
    // history stack, this key is 'default'. By checking this, we can reliably determine
    // if the user has navigated within the app.
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      // If there's no client-side navigation history, fall back to the homepage.
      // `replace: true` prevents the current path from being in the history.
      navigate('/', { replace: true });
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="inline-flex items-center gap-2 text-sm text-mks-gray hover:text-mks-dark font-semibold mb-6 transition-colors"
      aria-label="Go back to the previous page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Back</span>
    </button>
  );
};

export default BackButton;
