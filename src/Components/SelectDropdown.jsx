import React from 'react';

const SelectDropdown = ({ label, name, value, onChange, onBlur, options, error, touched, placeholder = 'Select an option' }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-select ${error && touched ? 'input-error' : ''}`}
        aria-invalid={error && touched ? 'true' : 'false'}
        aria-describedby={error && touched ? `${name}-error` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && (
        <span id={`${name}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default SelectDropdown;
