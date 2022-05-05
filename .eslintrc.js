'use strict'

const variableNamesBlacklist = ['objs', 'foo', 'bar', 'baz']

module.exports = {
  parser: 'babel-eslint',

  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true
  },

  extends: ['eslint:recommended', 'plugin:react/recommended'],

  rules: {
    // complexity
    // complexity: ['error', { max: 20 }],
    // 'max-statements': ['error', 25, { ignoreTopLevelFunctions: true }],
    // 'max-depth': ['error', { max: 10 }],
    // 'max-params': ['error', { max: 6 }],
    // 'max-nested-callbacks': ['error', { max: 3 }],
    // 'max-classes-per-file': ['error', 3],

    // ternary expressions
    'no-nested-ternary': 'error',

    // operators
    'operator-assignment': ['error', 'always'],

    // control statements
    'for-direction': 'error',
    'no-lonely-if': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty': 'error',
    'no-labels': 'error',
    'no-extra-label': 'error',
    'no-loop-func': 'error',
    'no-bitwise': 'error',
    'no-multi-assign': 'error',
    'no-plusplus': 'error',

    // naming
    'no-shadow': 'error',
    'func-name-matching': ['error', 'always'],
    'no-native-reassign': 'error',
    'consistent-this': ['error', 'self'],
    'no-catch-shadow': 'error',
    'no-underscore-dangle': 'error',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '(^_)|(^tw$)',
        caughtErrorsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    'id-blacklist': ['error', ...variableNamesBlacklist],
    // TODO: turn on and refactor later
    // 'id-length': ['error', { min: 2, exceptions: ['x', 'y', 'z', '_'] }],

    // returns
    'consistent-return': 'error',
    'getter-return': 'error',

    // strings
    'prefer-template': 'error',
    'no-useless-concat': 'error',

    // generators
    'require-yield': 'error',

    // async/await
    'require-atomic-updates': 'error',

    // switch/case
    'no-case-declarations': 'error',
    'default-case': ['error', { commentPattern: '^no default$' }],

    // warn about using console or debugger in development, fail in production
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-debugger': process.env.NODE_ENV !== 'production' ? 1 : 2,
    'no-alert': process.env.NODE_ENV !== 'production' ? 1 : 2,

    // use new syntax
    'no-void': 'error',
    'prefer-arrow-callback': 'error',
    'no-confusing-arrow': ['error', { allowParens: false }],
    'prefer-rest-params': 'error',
    'object-shorthand': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-var': 'error',
    'prefer-const': ['error', { ignoreReadBeforeAssign: false }],

    // best practices
    'vars-on-top': 'error',
    'dot-notation': 'error',
    'guard-for-in': 'error',
    'no-div-regex': 'error',
    'prefer-object-spread': 'error',
    'no-empty-function': ['error'],

    // security hardening
    'no-script-url': 'error',

    // other
    curly: 'error',

    // react
    'no-class-assign': 'off',
    'no-func-assign': 'off',
    'react/self-closing-comp': 'error',
    'react/prop-types': 'off'
  }
}
