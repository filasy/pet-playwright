// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
//   tseslint.configs.recommended,
// ]);

import typescript from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
const { configs: typescriptConfigs } = typescript;
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescript,
      'playwright': playwright,
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    rules: {
      // ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
      'playwright/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      '@stylistic/semi': 'error',
      '@stylistic/max-len': ['warn', { 'code': 120, ignoreUrls: true }],
      '@stylistic/no-trailing-spaces': 'error',
    },
  },
  // stylistic.configs.customize({
  //   'quoteProps': 'preserve',
  //   'tabWidth': 2,
  //   'singleQuote': true,
  //   'bracketSameLine': true,
  // }),
];
