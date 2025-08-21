import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import * as os from 'node:os';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? '80%' : '50%',
  outputDir: '.test/output',
  snapshotPathTemplate: `.test/__screenshots__/{testFileName}/{arg}{ext}`,
  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
    [
      'monocart-reporter',
      {
        name: 'Yuliya Pirogova',
        outputFile: '.test/output/monocart-report/index.html',
      },
    ],
    // ['./utils/slowStepReporter.ts'],
  ],
  use: {
    baseURL: 'https://rutube.ru',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
    proxy: isCI
      ? {
          server: process.env.PROXY_IP!,
          username: process.env.PROXY_LOGIN!,
          password: process.env.PROXY_PASSWORD!,
        }
      : undefined,
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
      name: 'learn-qa-API',
      grep: new RegExp('@learnqa'),
      use: {
        baseURL: 'https://playground.learnqa.ru/api/',
        trace: 'retain-on-failure',
        screenshot: 'off',
        video: 'off',
      },
    },
    {
      name: 'challenges-API',
      grep: new RegExp('@challenges'),
      workers: 1,
      use: {
        baseURL: 'https://apichallenges.herokuapp.com/',
        trace: 'retain-on-failure',
        screenshot: 'off',
        video: 'off',
      },
    },
  ],
});
