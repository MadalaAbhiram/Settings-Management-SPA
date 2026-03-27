import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import '../../styles/dashboard.css';

const UserDashboard = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const { currentUser } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleViewSettings = () => {
    navigate(`/user-settings/${currentUser.id}`);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="header-actions">
          <span className="welcome-text">Welcome, {currentUser.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="users-section">
          <h2>My Profile</h2>
          <div className="users-list">
            <div className="user-card" onClick={handleViewSettings}>
              <div className="user-info">
                <h3>{currentUser.name}</h3>
                <p>{currentUser.email}</p>
              </div>
              <button className="view-settings-btn">View Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
