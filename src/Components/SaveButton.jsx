import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const SaveButton = ({
  onClick,
  loading = false,
  disabled = false,
  text = 'Save Changes',
  type = 'button',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="btn btn-primary save-button"
      type={type}
      aria-busy={loading}
    >
      {loading ? <LoadingSpinner size="small" message="" /> : text}
    </button>
  );
};

export default SaveButton;
