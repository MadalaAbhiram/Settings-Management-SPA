import { runSettingsReducerTests } from './settingsReducer.test.js';
import { runValidationRulesTests } from './validationRules.test.js';

const testCases = [
  ['settingsReducer', runSettingsReducerTests],
  ['validationRules', runValidationRulesTests],
];

let hasFailures = false;

for (const [name, run] of testCases) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    hasFailures = true;
    console.error(`FAIL ${name}`);
    console.error(error);
  }
}

if (hasFailures) {
  globalThis.process.exitCode = 1;
} else {
  console.log('All tests passed.');
}
