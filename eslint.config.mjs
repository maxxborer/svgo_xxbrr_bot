import js from "@eslint/js";
import depend from "eslint-plugin-depend";
import github from "eslint-plugin-github";
import noSecrets from "eslint-plugin-no-secrets";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "**/*.json",
      "**/*.jsonc",
      "**/*.json5",
    ],
  },

  perfectionist.configs["recommended-natural"],
  {
    extends: ["js/recommended"],
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    extends: ["depend/flat/recommended"],
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      depend,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      "no-secrets": noSecrets,
    },
    rules: {
      "no-secrets/no-secrets": "error",
    },
  },
  github.getFlatConfigs().recommended,
  ...github.getFlatConfigs().typescript,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["eslint.config.mjs"],
    rules: {
      "github/array-foreach": "error",
      "github/async-preventdefault": "warn",
      "github/no-blur": "error",
      "github/no-then": "error",
      "no-console": ["error", { allow: ["warn", "error", "info", "debug"] }],
    },
  },
  tseslint.configs.recommended,
]);
