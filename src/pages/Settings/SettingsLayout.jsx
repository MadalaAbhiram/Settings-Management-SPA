import React, { useContext } from 'react';
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import { getLanguage, t } from '../../utils/i18n';

const SettingsLayout = ({ actionMode = 'back', showActionButton = true }) => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const language = getLanguage(state);

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleTopAction = () => {
    const destination = state.currentUser?.isAdmin ? '/dashboard' : '/expenses';
    navigate(destination);
  };

  const actionLabel = actionMode === 'back'
    ? t(language, '<- back')
    : t(language, 'logout');

  return (
    <div className="settings-layout">
      <div className="settings-sidebar">
        {showActionButton && (
          <button onClick={handleTopAction} className="dashboard-link" type="button">
            {actionLabel}
          </button>
        )}
        <h1>{t(language, 'settingsTitle')}</h1>
        <nav className="settings-nav">
          <Link to="general" className="nav-link">
            {t(language, 'general')}
          </Link>
          <Link to="notifications" className="nav-link">
            {t(language, 'notifications')}
          </Link>
          <Link to="privacy" className="nav-link">
            {t(language, 'privacy')}
          </Link>
        </nav>
      </div>
      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
