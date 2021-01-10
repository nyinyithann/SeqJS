/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {

  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  setupFiles: ['./tests/helpers/helper.js'],
  testEnvironment: 'node',
  testRegex: '(/(tests/more|tests/specs)/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
};
