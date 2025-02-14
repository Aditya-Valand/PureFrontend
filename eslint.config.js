import js from '@eslint/js'; 
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist'], // Ignore the dist folder during linting
  },
  {
    files: ['**/*.{js,jsx}'], // Files to apply rules to
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Define browser globals
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { 
      react: { version: '18.3' }, // Set React version
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off', // Allow the use of `target="_blank"` in JSX
      'react-refresh/only-export-components': [
        'warn', 
        { allowConstantExport: true }, // Warn for components that should be exported
      ],
    },
  },
];
