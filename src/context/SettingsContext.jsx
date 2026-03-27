import React, { createContext, useEffect, useReducer } from 'react';
import settingsReducer from './settingsReducer';
import { loadExpenses, saveExpenses } from '../services/expenseService';

const SettingsContext = createContext();
export { SettingsContext };

const AUTH_STORAGE_KEY = 'currentUserId';
const USERS_STORAGE_KEY = 'appUsers';
const USER_SETTINGS_STORAGE_KEY = 'appUserSettings';
const EXPENSES_STORAGE_KEY = 'appExpenses';

const defaultUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true,
    password: 'admin123',
  },
];

const createDefaultSettingsForUser = (userName = '') => ({
  general: {
    appName: 'My App',
    UserName: userName,
    theme: 'light',
    language: 'en',
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false,
    smsAlerts: false,
  },
  privacy: {
    shareProfile: false,
    showOnlineStatus: true,
    allowThirdParty: false,
  },
});

const createSettingsMap = (users) => (
  users.reduce((acc, user) => {
    acc[user.id] = createDefaultSettingsForUser(user.name);
    return acc;
  }, {})
);

const parseStoredJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const initialState = {
  users: defaultUsers,
  userSettings: createSettingsMap(defaultUsers),
  currentUser: null,
  uiPreferences: {
    theme: 'light',
    language: 'en',
  },
  expenses: [],
  loading: false,
  error: null,
  success: false,
};

const initializeState = () => {
  const storedUsers = parseStoredJson(USERS_STORAGE_KEY, null);
  const users = Array.isArray(storedUsers) && storedUsers.length > 0 ? storedUsers : defaultUsers;

  const defaultSettings = createSettingsMap(users);
  const storedUserSettings = parseStoredJson(USER_SETTINGS_STORAGE_KEY, {});

  const userSettings = users.reduce((acc, user) => {
    const stored = storedUserSettings?.[user.id] || {};
    const defaults = defaultSettings[user.id];

    acc[user.id] = {
      general: { ...defaults.general, ...(stored.general || {}) },
      notifications: { ...defaults.notifications, ...(stored.notifications || {}) },
      privacy: { ...defaults.privacy, ...(stored.privacy || {}) },
    };

    return acc;
  }, {});

  const savedUserId = localStorage.getItem(AUTH_STORAGE_KEY);
  const currentUser = savedUserId
    ? users.find((user) => user.id === Number(savedUserId)) || null
    : null;

  const storedTheme = localStorage.getItem('appTheme') || 'light';
  const storedLanguage = localStorage.getItem('appLanguage') || 'en';
  const storedExpenses = parseStoredJson(EXPENSES_STORAGE_KEY, null);

  return {
    ...initialState,
    users,
    userSettings,
    currentUser,
    expenses: Array.isArray(storedExpenses)
      ? storedExpenses
      : loadExpenses(),
    uiPreferences: {
      theme: storedTheme,
      language: storedLanguage,
    },
  };
};

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState, initializeState);

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(state.users));
  }, [state.users]);

  useEffect(() => {
    localStorage.setItem(USER_SETTINGS_STORAGE_KEY, JSON.stringify(state.userSettings));
  }, [state.userSettings]);

  useEffect(() => {
    saveExpenses(state.expenses);
  }, [state.expenses]);

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, String(state.currentUser.id));
      return;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [state.currentUser]);

  useEffect(() => {
    const currentUserId = state.currentUser?.id;
    const general = currentUserId ? state.userSettings?.[currentUserId]?.general : null;
    const preferredTheme = general?.theme || 'light';
    const preferredLanguage = general?.language || 'en';

    if (!currentUserId) {
      document.documentElement.lang = 'en';
      document.documentElement.dataset.theme = 'light';
      return undefined;
    }

    if (general?.theme) {
      localStorage.setItem('appTheme', general.theme);
    }
    if (general?.language) {
      localStorage.setItem('appLanguage', general.language);
    }

    document.documentElement.lang = preferredLanguage;

    if (preferredTheme === 'auto' && window?.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const applyTheme = () => {
        document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
      };

      applyTheme();
      if (media.addEventListener) {
        media.addEventListener('change', applyTheme);
        return () => media.removeEventListener('change', applyTheme);
      }

      media.addListener(applyTheme);
      return () => media.removeListener(applyTheme);
    }

    document.documentElement.dataset.theme = preferredTheme;
    return undefined;
  }, [state.currentUser, state.userSettings]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
