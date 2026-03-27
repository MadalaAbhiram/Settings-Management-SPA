import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SettingsContext from '../../context/SettingsContext';
import useFormValidation from '../../hooks/useFormValidation';
import { validateGeneralSettings } from '../../utils/validationRules';
import TextInput from '../../Components/TextInput';
import SelectDropdown from '../../Components/SelectDropdown';
import SaveButton from '../../Components/SaveButton';
import { saveSettings } from '../../services/mockApi';
import { getLanguage, t } from '../../utils/i18n';

const defaultGeneralSettings = {
  appName: 'My App',
  UserName: '',
  theme: 'light',
  language: 'en',
};

const getStoredGeneralSettings = () => {
  try {
    const storedTheme = localStorage.getItem('appTheme');
    const storedLanguage = localStorage.getItem('appLanguage');
    return {
      ...defaultGeneralSettings,
      theme: storedTheme || defaultGeneralSettings.theme,
      language: storedLanguage || defaultGeneralSettings.language,
    };
  } catch {
    return defaultGeneralSettings;
  }
};

const GeneralSettings = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const { userId } = useParams();

  const targetUserId = userId ? Number(userId) : state.currentUser?.id;
  const currentGeneralSettings = targetUserId
    ? state.userSettings?.[targetUserId]?.general || defaultGeneralSettings
    : getStoredGeneralSettings();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues } = useFormValidation(
    currentGeneralSettings,
    validateGeneralSettings,
  );
  const language = getLanguage(state);
  const previewLanguage = language;

  useEffect(() => {
    setValues(currentGeneralSettings);
  }, [currentGeneralSettings, setValues]);

  const applyUiPreferences = (formValues) => {
    const nextLang = formValues.language || 'en';
    const nextTheme = formValues.theme || 'light';

    document.documentElement.lang = nextLang;
    if (nextTheme === 'auto' && window?.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
    } else {
      document.documentElement.dataset.theme = nextTheme;
    }

    try {
      localStorage.setItem('appLanguage', nextLang);
      localStorage.setItem('appTheme', nextTheme);
    } catch {
      // ignore storage errors
    }

    if (targetUserId) {
      const nextSettings = {
        ...currentGeneralSettings,
        theme: nextTheme,
        language: nextLang,
      };
      dispatch({
        type: 'SET_GENERAL_SETTINGS',
        payload: { userId: targetUserId, settings: nextSettings },
      });
    } else {
      dispatch({
        type: 'SET_APP_PREFERENCES',
        payload: { theme: nextTheme, language: nextLang },
      });
    }
  };

  const onSubmit = async (formValues) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      if (targetUserId) {
        await saveSettings({ ...state, userSettings: { ...state.userSettings, [targetUserId]: { ...state.userSettings[targetUserId], general: formValues } } });
        dispatch({ type: 'SET_GENERAL_SETTINGS', payload: { userId: targetUserId, settings: formValues } });
      } else {
        dispatch({ type: 'SET_APP_PREFERENCES', payload: { theme: formValues.theme, language: formValues.language } });
      }

      applyUiPreferences(formValues);
      dispatch({ type: 'SET_SUCCESS', payload: true });
      setTimeout(() => dispatch({ type: 'RESET_STATE' }), 3000);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handleGeneralChange = (event) => {
    handleChange(event);
  };

  const themeOptions = [
    { value: 'light', label: t(previewLanguage, 'light') },
    { value: 'dark', label: t(previewLanguage, 'dark') },
    { value: 'auto', label: t(previewLanguage, 'auto') },
  ];

  const languageOptions = [
    { value: 'en', label: t(previewLanguage, 'english') },
    { value: 'es', label: t(previewLanguage, 'spanish') },
    { value: 'fr', label: t(previewLanguage, 'french') },
  ];

  return (
    <div className="settings-section">
      <h2>{t(previewLanguage, 'generalSettingsTitle')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label={t(previewLanguage, 'userName')}
          name="UserName"
          value={values.UserName || ''}
          onChange={handleGeneralChange}
          onBlur={handleBlur}
          error={errors.UserName}
          touched={touched.UserName}
          placeholder={t(previewLanguage, 'userName')}
        />
        <SelectDropdown
          label={t(previewLanguage, 'theme')}
          name="theme"
          value={values.theme || 'light'}
          onChange={handleGeneralChange}
          onBlur={handleBlur}
          options={themeOptions}
          error={errors.theme}
          touched={touched.theme}
          placeholder={t(previewLanguage, 'selectOption')}
        />
        <SelectDropdown
          label={t(previewLanguage, 'language')}
          name="language"
          value={values.language || 'en'}
          onChange={handleGeneralChange}
          onBlur={handleBlur}
          options={languageOptions}
          error={errors.language}
          touched={touched.language}
          placeholder={t(previewLanguage, 'selectOption')}
        />
        {state.success && <div className="success-message">{t(previewLanguage, 'settingsSaved')}</div>}
        {state.error && <div className="error-message">{state.error}</div>}
        <SaveButton
          loading={state.loading}
          text={t(previewLanguage, 'saveChanges')}
          onClick={() => applyUiPreferences(values)}
        />
      </form>
    </div>
  );
};

export default GeneralSettings;
