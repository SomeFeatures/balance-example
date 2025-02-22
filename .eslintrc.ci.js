module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'plugin:diff/diff',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'spaced-comment': ['error', 'always'],
    'no-inline-comments': 'error',
    'jsdoc/require-jsdoc': [
      'error',
      { require: { FunctionDeclaration: true, ClassDeclaration: true, MethodDefinition: true } },
    ],
    'jsdoc/require-description': 'error',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-param-description': 0,
    'jsdoc/require-returns-description': 0,
    'no-use-before-define': 'error',
  },
};
