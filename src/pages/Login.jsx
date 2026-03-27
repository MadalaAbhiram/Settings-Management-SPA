import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/SettingsContext';
import '../styles/login.css';

const Login = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    const user = state.users.find(
      (u) => u.email === normalizedEmail && u.password === password,
    );

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      setLoading(false);
      navigate(user.isAdmin ? '/dashboard' : '/expenses');
    } else {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
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
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className={error ? 'error' : ''}
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logining in...' : 'Login In'}
          </button>
        </form>

        <p className="auth-switch-text">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
