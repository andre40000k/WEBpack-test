const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginNode = require("eslint-plugin-node");
const eslintPluginPromise = require("eslint-plugin-promise");
const eslintPluginTs = require("@typescript-eslint/eslint-plugin");
const eslintParserTs = require("@typescript-eslint/parser");
const eslintPluginCssModules = require("eslint-plugin-css-modules");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: eslintParserTs,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      import: eslintPluginImport,
      node: eslintPluginNode,
      promise: eslintPluginPromise,
      "css-modules": eslintPluginCssModules,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      eqeqeq: "error",
      "css-modules/no-unused-class": "warn",
    },
  },

  // Конфигурация для JavaScript
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: {
      import: eslintPluginImport,
      node: eslintPluginNode,
      promise: eslintPluginPromise,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      eqeqeq: "error",
    },
  },
];
