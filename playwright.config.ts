import {defineConfig, devices} from '@playwright/test'
import {setgroups} from 'process'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.travisperkins.co.uk/',
    headless: false,
    testIdAttribute: 'data-test-id',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      testDir: './tests/e2e',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/cookies.json',
      },
      dependencies: ['setup'],
    },
  ],
})
