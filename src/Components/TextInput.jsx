import React from 'react';

const TextInput = ({ label, name, value, onChange, onBlur, error, touched, placeholder, type = 'text' }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`form-input ${error && touched ? 'input-error' : ''}`}
        aria-invalid={error && touched ? 'true' : 'false'}
        aria-describedby={error && touched ? `${name}-error` : undefined}
      />
      {error && touched && (
        <span id={`${name}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;