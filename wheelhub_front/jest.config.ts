/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    // ...
    '^#root/(.*)$': '<rootDir>/$1',
    '^#app/(.*)$': '<rootDir>/src/app/$1',
    '^#core/(.*)$': '<rootDir>/src/core/$1',
    '^#styles/(.*)$': '<rootDir>/styles/$1',
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
