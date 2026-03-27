import React from 'react';

const ToggleSwitch = ({ label, name, checked, onChange, disabled = false }) => {
  return (
    <div className="toggle-container">
      <label htmlFor={name} className="toggle-label">
        <span>{label}</span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="toggle-input"
            role="switch"
            aria-checked={checked}
          />
          <span className="toggle-slider"></span>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;