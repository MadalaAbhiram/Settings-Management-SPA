import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const SaveButton = ({ onClick, loading = false, disabled = false, text = 'Save Changes' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="btn btn-primary save-button"
      type="submit"
      aria-busy={loading}
    >
      {loading ? <LoadingSpinner size="small" message="" /> : text}
    </button>
  );
};

export default SaveButton;