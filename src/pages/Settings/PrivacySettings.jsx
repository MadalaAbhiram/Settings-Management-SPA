import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import SettingsContext from '../../context/SettingsContext';
import ToggleSwitch from '../../Components/ToggleSwitch';
import SaveButton from '../../Components/SaveButton';
import { saveSettings } from '../../services/mockApi';
import { getLanguage, t } from '../../utils/i18n';

const PrivacySettings = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const language = getLanguage(state);
  const { userId } = useParams();

  const targetUserId = userId ? Number(userId) : state.currentUser?.id;
  const currentPrivacy = state.userSettings?.[targetUserId]?.privacy || {
    shareProfile: false,
    showOnlineStatus: true,
    allowThirdParty: false,
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    if (!targetUserId) {
      return;
    }

    dispatch({
      type: 'SET_PRIVACY_SETTINGS',
      payload: {
        userId: targetUserId,
        settings: { ...currentPrivacy, [name]: checked },
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
      <h2>{t(language, 'privacySettingsTitle')}</h2>
      <div className="toggle-group">
        <ToggleSwitch
          label={t(language, 'shareProfile')}
          name="shareProfile"
          checked={currentPrivacy.shareProfile}
          onChange={handleToggleChange}
        />
        <ToggleSwitch
          label={t(language, 'showOnlineStatus')}
          name="showOnlineStatus"
          checked={currentPrivacy.showOnlineStatus}
          onChange={handleToggleChange}
        />
        <ToggleSwitch
          label={t(language, 'allowThirdPartyAccess')}
          name="allowThirdParty"
          checked={currentPrivacy.allowThirdParty}
          onChange={handleToggleChange}
        />
      </div>
      {state.success && <div className="success-message">{t(language, 'privacySaved')}</div>}
      {state.error && <div className="error-message">{state.error}</div>}
      <SaveButton onClick={handleSave} loading={state.loading} text={t(language, 'saveChanges')} />
    </div>
  );
};

export default PrivacySettings;
