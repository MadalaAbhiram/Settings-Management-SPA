import React, { useContext } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import SettingsLayout from '../Settings/SettingsLayout';
import '../../styles/dashboard.css';

const UserSettingsView = () => {
  const { userId } = useParams();
  const { state } = useContext(SettingsContext);
  const navigate = useNavigate();

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!state.currentUser.isAdmin) {
    return <Navigate to="/settings/general" replace />;
  }

  const numericUserId = Number(userId);
  const user = state.users.find((u) => u.id === numericUserId);

  if (!user) {
    return <div>User not found</div>;
  }

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="admin-view-settings-page">
      <div className="admin-view-header">
        <div className="admin-view-title-row">
          <button onClick={handleBack} className="back-dashboard-btn" type="button">
            {'« Back'}
          </button>
          <div className="admin-view-title-text">
            <h2>Viewing Settings for: {user.name}</h2>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </div>
      <SettingsLayout actionMode="back" showActionButton={false} />
    </div>
  );
};

export default UserSettingsView;
