/* eslint-disable */
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  // moduleNameMapper handles legacy zone bundle path and maps HTML/CSS imports used by components
  moduleNameMapper: {
    '^zone\\.js/bundles/zone-testing-bundle\\.umd$': '<rootDir>/zone-testing-shim.js',
    '^.+\\.(html)$': 'jest-preset-angular/html',
    '^.+\\.(css|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageDirectory: 'coverage/jest',
  testEnvironment: 'jsdom'
};

export default config;
