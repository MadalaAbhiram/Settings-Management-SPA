import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import SettingsContext from '../../context/SettingsContext';
import ToggleSwitch from '../../Components/ToggleSwitch';
import SaveButton from '../../Components/SaveButton';
import { saveSettings } from '../../services/mockApi';
import { getLanguage, t } from '../../utils/i18n';

const NotificationSettings = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const language = getLanguage(state);
  const { userId } = useParams();

  const targetUserId = userId ? Number(userId) : state.currentUser?.id;
  const currentNotifications = state.userSettings?.[targetUserId]?.notifications || {
    emailNotifications: true,
    pushNotifications: false,
    smsAlerts: false,
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    if (!targetUserId) {
      return;
    }

    dispatch({
      type: 'SET_NOTIFICATION_SETTINGS',
      payload: {
        userId: targetUserId,
        settings: { ...currentNotifications, [name]: checked },
      },
    });
  };

  const handleSave = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await saveSettings(state);
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => dispatch({ type: 'RESET_STATE' }), 3000);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <div className="settings-section">
      <h2>{t(language, 'notificationSettingsTitle')}</h2>
      <div className="toggle-group">
        <ToggleSwitch
          label={t(language, 'emailNotifications')}
          name="emailNotifications"
          checked={currentNotifications.emailNotifications}
          onChange={handleToggleChange}
        />
        <ToggleSwitch
          label={t(language, 'pushNotifications')}
          name="pushNotifications"
          checked={currentNotifications.pushNotifications}
          onChange={handleToggleChange}
        />
        <ToggleSwitch
          label={t(language, 'smsAlerts')}
          name="smsAlerts"
          checked={currentNotifications.smsAlerts}
          onChange={handleToggleChange}
        />
      </div>
      {state.success && <div className="success-message">{t(language, 'notificationSaved')}</div>}
      {state.error && <div className="error-message">{state.error}</div>}
      <SaveButton onClick={handleSave} loading={state.loading} text={t(language, 'saveChanges')} />
    </div>
  );
};

export default NotificationSettings;
