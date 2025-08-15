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
    isCI ? ['github'] : ['list'], // ['html', { open: 'on-failure', noSnippets: true }],
    [
      'monocart-reporter',
      {
        name: 'Yuliya Pirogova',
        outputFile: '.test/output/monocart-report/index.html',
      },
    ],
    ['./utils/slowStepReporter.ts'],
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
      // : undefined,
  },

  projects: [
    { name: 'auth', testMatch: 'tests/UI/auth.spec.ts' },
    {
      name: 'authorized',
      testDir: 'tests/UI/authorized',
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
      testDir: 'tests/UI/unauthorized',
      expect: {
        toMatchAriaSnapshot: {
          pathTemplate: `.test/__snapshots__/unauthorized/{testFileName}/{arg}{ext}`,
        },
      },
    },
    {
      name: 'API',
      testDir: 'tests/API',
      use: {
        baseURL: 'https://playground.learnqa.ru',
        trace: 'retain-on-failure',
        screenshot: 'off',
        video: 'off',
      },
    },
  ],
});
