/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {

  coverageProvider: 'v8',

  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@presentation/(.*)': '<rootDir>/src/core/presentation/$1',
    '@domain/(.*)': '<rootDir>/src/core/domain/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1'
  },
  preset: 'ts-jest',

  testMatch: ['**/*.{test,spec}.ts'],

  testPathIgnorePatterns: [
    '/node_modules/'
  ]

};
