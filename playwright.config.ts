import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? '80%' : '50%',
  testDir: './tests',
  outputDir: '.test/spec/output',
  snapshotPathTemplate: `.test/__screenshots__/{testFileName}/{arg}{ext}`,
  reporter: [
    isCI
      ? ['github']
      : ['html', { outputFolder: '.test/spec/html_report', open: 'always', noSnippets: true }],
    // ['./utils/slowStepReporter.ts'],
  ],
  use: {
    baseURL: 'https://rutube.ru',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },

  projects: [
    { name: 'auth', testMatch: 'tests/auth.spec.ts' },
    {
      name: 'authorized',
      testDir: 'tests/authorized',
      use: {
        storageState: '.test/auth.json',
      },
      dependencies: ['auth'],
      expect: {
        toMatchAriaSnapshot: {
          pathTemplate: `.test/__snapshots__/authorized/{testFileName}/{arg}{ext}`,
        },
      },
    },
    {
      name: 'unauthorized',
      testDir: 'tests/unauthorized',
      expect: {
        toMatchAriaSnapshot: {
          pathTemplate: `.test/__snapshots__/unauthorized/{testFileName}/{arg}{ext}`,
        },
      },
    },
  ],
});
