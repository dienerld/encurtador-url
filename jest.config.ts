/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {

  coverageProvider: 'v8',

  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/$1',
    '^@infra/(.*)$': '<rootDir>/src/$1'
  },

  preset: 'ts-jest',

  testMatch: ['**/*.{test,spec}.ts'],

  testPathIgnorePatterns: [
    '/node_modules/'
  ]

};
