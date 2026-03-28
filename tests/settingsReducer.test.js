import assert from 'node:assert/strict';
import settingsReducer from '../src/context/settingsReducer.js';

const baseState = {
  users: [
    { id: 1, name: 'Admin', isAdmin: true },
    { id: 2, name: 'User', isAdmin: false },
  ],
  userSettings: {
    1: {
      general: { UserName: 'Admin', theme: 'light', language: 'en' },
      notifications: { emailNotifications: true, pushNotifications: false, smsAlerts: false },
      privacy: { shareProfile: false, showOnlineStatus: true, allowThirdParty: false },
    },
    2: {
      general: { UserName: 'User', theme: 'light', language: 'en' },
      notifications: { emailNotifications: true, pushNotifications: false, smsAlerts: false },
      privacy: { shareProfile: false, showOnlineStatus: true, allowThirdParty: false },
    },
  },
  currentUser: { id: 2, name: 'User', isAdmin: false },
  uiPreferences: { theme: 'light', language: 'en' },
  expenses: [],
  loading: false,
  error: null,
  success: false,
};

export const runSettingsReducerTests = () => {
  const nextGeneralState = settingsReducer(baseState, {
    type: 'SET_GENERAL_SETTINGS',
    payload: {
      userId: 2,
      settings: { UserName: 'Updated User', theme: 'dark', language: 'fr' },
    },
  });

  assert.equal(nextGeneralState.userSettings[2].general.UserName, 'Updated User');
  assert.equal(nextGeneralState.userSettings[2].general.theme, 'dark');
  assert.equal(nextGeneralState.userSettings[1].general.UserName, 'Admin');

  const removedUserState = settingsReducer(baseState, {
    type: 'REMOVE_USER',
    payload: 2,
  });

  assert.equal(removedUserState.users.some((user) => user.id === 2), false);
  assert.equal(removedUserState.userSettings[2], undefined);
  assert.equal(removedUserState.currentUser, null);
};
