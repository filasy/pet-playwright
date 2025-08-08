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
  outputDir: '.test/output',
  snapshotPathTemplate: `.test/__screenshots__/{testFileName}/{arg}{ext}`,
  reporter: [
    isCI ? ['github'] : ['html', { open: 'on-failure', noSnippets: true }],
    // ['./utils/slowStepReporter.ts'],
  ],
  use: {
    baseURL: 'https://rutube.ru',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
    // proxy: isCI
    //   ? {
    //       server: process.env.PROXY_IP!,
    //       username: process.env.PROXY_LOGIN!,
    //       password: process.env.PROXY_PASSWORD!,
    //     }
    //   : undefined,
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
