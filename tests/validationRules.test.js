import assert from 'node:assert/strict';
import { validateGeneralSettings } from '../src/utils/validationRules.js';

export const runValidationRulesTests = () => {
  const invalidErrors = validateGeneralSettings({
    UserName: ' ',
    theme: '',
    language: '',
  });

  assert.deepEqual(invalidErrors, {
    UserName: 'User name is required',
    theme: 'Theme selection is required',
    language: 'Language selection is required',
  });

  const validErrors = validateGeneralSettings({
    UserName: 'Madal',
    theme: 'dark',
    language: 'en',
  });

  assert.equal(validErrors, null);
};
