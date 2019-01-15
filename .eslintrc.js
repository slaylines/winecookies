module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:react/recommended',
  ],

  plugins: [
    'prettier',
    'react',
  ],

  env: {
    browser: true,
    es6: true,
    jquery: true,
  },

  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },

  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },

  rules: {
    'prettier/prettier': 'error',
    'no-mixed-operators': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': ['error', { ignore: ['children'] }],
    'import/no-extraneous-dependencies': 'off',
  },
};
