export const validateGeneralSettings = (values) => {
  const errors = {};

  if (!values.UserName || values.UserName.trim().length === 0) {
    errors.UserName = 'User name is required';
  }
  if (!values.theme) {
    errors.theme = 'Theme selection is required';
  }
  if (!values.language) {
    errors.language = 'Language selection is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateNotificationSettings = () => {
  return null;
};

export const validatePrivacySettings = () => {
  return null;
};
