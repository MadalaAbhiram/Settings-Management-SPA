const createDefaultUserSettings = (userName = '') => ({
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

const updateUserSettings = (state, userId, section, sectionSettings) => ({
  ...state,
  userSettings: {
    ...state.userSettings,
    [userId]: {
      ...(state.userSettings?.[userId] || {}),
      [section]: sectionSettings,
    },
  },
});

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_PREFERENCES': {
      return {
        ...state,
        uiPreferences: {
          ...state.uiPreferences,
          ...action.payload,
        },
      };
    }
    case 'SET_GENERAL_SETTINGS': {
      const { userId, settings } = action.payload;
      return updateUserSettings(state, userId, 'general', settings);
    }
    case 'SET_NOTIFICATION_SETTINGS': {
      const { userId, settings } = action.payload;
      return updateUserSettings(state, userId, 'notifications', settings);
    }
    case 'SET_PRIVACY_SETTINGS': {
      const { userId, settings } = action.payload;
      return updateUserSettings(state, userId, 'privacy', settings);
    }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload,
        loading: false,
        error: null,
      };
    case 'RESET_STATE':
      return {
        ...state,
        error: null,
        success: false,
      };
    case 'ADD_USER': {
      const newUser = action.payload;
      return {
        ...state,
        users: [...(state.users || []), newUser],
        userSettings: {
          ...state.userSettings,
          [newUser.id]: createDefaultUserSettings(newUser.name),
        },
      };
    }
    case 'REMOVE_USER': {
      const userIdToRemove = action.payload;
      const nextUserSettings = { ...state.userSettings };
      delete nextUserSettings[userIdToRemove];

      return {
        ...state,
        users: (state.users || []).filter((user) => user.id !== userIdToRemove),
        userSettings: nextUserSettings,
        currentUser: state.currentUser?.id === userIdToRemove ? null : state.currentUser,
      };
    }
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
      };

    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...(state.expenses || []), action.payload],
      };

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: (state.expenses || []).filter((exp) => exp.id !== action.payload),
      };

    default:
      return state;
  }
};

export default settingsReducer;
