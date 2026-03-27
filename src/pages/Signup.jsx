import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/SettingsContext';
import '../styles/login.css';

const Signup = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    if (!normalizedName) {
      setError('Name is required.');
      setLoading(false);
      return;
    }

    const emailExists = state.users.some((user) => user.email === normalizedEmail);
    if (emailExists) {
      setError('Email already exists. Please sign in instead.');
      setLoading(false);
      return;
    }

    const nextId = state.users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;

    const newUser = {
      id: nextId,
      name: normalizedName,
      email: normalizedEmail,
      password,
      isAdmin: false,
    };

    dispatch({ type: 'ADD_USER', payload: newUser });
    dispatch({ type: 'LOGIN', payload: newUser });
    setLoading(false);
    navigate('/expenses');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Sign up to create your own settings profile</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              autoComplete="name"
              className={error ? 'error' : ''}
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className={error ? 'error' : ''}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              autoComplete="new-password"
              className={error ? 'error' : ''}
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
