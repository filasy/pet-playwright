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
    ['list'],
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
    // ['testit-adapter-playwright'],
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
      name: 'rutube-auth-UI',
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
      name: 'rutube-unauth-UI',
      testDir: 'tests/UI/unauthorized',
      expect: {
        toMatchAriaSnapshot: {
          pathTemplate: `.test/__snapshots__/unauthorized/{testFileName}/{arg}{ext}`,
        },
      },
    },
    {
      name: 'learnqa-API',
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
      testMatch: 'tests/API/challenges.spec.ts',
      fullyParallel: false,
      use: {
        baseURL: 'https://apichallenges.herokuapp.com/',
        trace: 'retain-on-failure',
        screenshot: 'off',
        video: 'off',
      },
    },
  ],
});
