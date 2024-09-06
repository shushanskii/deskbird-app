// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      'no-console': [
        'error',
        {
          allow: [
            'info',
            'error',
            'warn',
            'groupCollapsed',
            'groupEnd',
            'table',
            'trace',
          ],
        },
      ],
      'no-debugger': 'error',
      'object-shorthand': ['error', 'properties'],
      'spaced-comment': ['error', 'always'],
      'capitalized-comments': [
        'warn',
        'always',
        {
          ignoreConsecutiveComments: true,
          ignoreInlineComments: true,
        },
      ],
      'no-invalid-this': 'off',
      'no-unused-expressions': ['error', { allowShortCircuit: true }],
      'no-fallthrough': 'error',
      'arrow-body-style': ['warn', 'as-needed'],
      'no-sequences': 'error',
      'prefer-template': 'error',
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
