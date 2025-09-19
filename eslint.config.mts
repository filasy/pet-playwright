import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
// const { configs: typescriptConfigs } = typescript;
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    files: ["tests/**/*.ts", "playwright.config.ts"],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
      "@stylistic": stylistic,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    rules: {
      // ...typescriptConfigs.recommended.rules,
      // ...playwright.configs['flat/recommended'].rules,
      // 'playwright/expect-expect': 'off',
      // 'playwright/no-conditional-in-test': 'off',
      "@stylistic/semi": "error",
      "@stylistic/quotes": [2, "single", { allowTemplateLiterals: "always" }],
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-trailing-spaces": "error",

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/restrict-template-expressions": "off",
      // "@typescript-eslint/no-floating-promises": "warn",

      "no-console": "warn",
      "require-await": "warn",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-empty-pattern": "warn",
      "no-return-await": "error",
    },
  },
];
