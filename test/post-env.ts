import { cleanupBeforeEachSpec } from './database-cleaner';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (global.jasmine.testPath.endsWith('.e2e-spec.ts')) {
  cleanupBeforeEachSpec();
}
