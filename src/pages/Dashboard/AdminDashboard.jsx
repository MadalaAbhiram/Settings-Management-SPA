import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import '../../styles/dashboard.css';

const AdminDashboard = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const { users, currentUser } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleViewUserSettings = (userId) => {
    navigate(`/user-settings/${userId}`);
  };

  const handleViewExpenses = () => {
    navigate('/expenses/admin');
  };

  const handleRemoveUser = (userId) => {
    dispatch({ type: 'REMOVE_USER', payload: userId });
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <span className="welcome-text">Welcome, {currentUser.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
          <button onClick={handleViewExpenses} className="view-settings-btn" type="button">
            Expense Tracker
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="users-section">
          <h2>All Users</h2>
          <div className="users-list">
            {users.filter(u => !u.isAdmin).map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3 title={user.name}>{user.name}</h3>
                  <p title={user.email}>{user.email}</p>
                </div>
                <div className="user-actions">
                  <button
                    className="view-settings-btn"
                    type="button"
                    onClick={() => handleViewUserSettings(user.id)}
                  >
                    View Settings
                  </button>
                  <button
                    className="remove-user-btn"
                    type="button"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Remove User
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
