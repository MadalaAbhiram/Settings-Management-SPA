// Simulated API for saving and loading settings

export const saveSettings = (settings) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate
      if (isSuccess) {
        localStorage.setItem('appSettings', JSON.stringify(settings));
        resolve({ success: true, message: 'Settings saved successfully!' });
      } else {
        reject({ success: false, message: 'Failed to save settings. Please try again.' });
      }
    }, 1500); // Simulate network delay
  });
};

export const loadSettings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        resolve(JSON.parse(savedSettings));
      } else {
        resolve(null);
      }
    }, 800);
  });
};