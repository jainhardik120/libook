import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'postcss.config.mjs',
    'eslint.config.mjs',
  ]),
  {
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
    },
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
        },
      ],

      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: ['property'],

          filter: {
            regex: '^(data-|aria-|on[A-Z])',
            match: false,
          },

          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],

      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-meaningless-void-operator': 'error',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],

      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',

      '@typescript-eslint/strict-boolean-expressions': [
        'warn',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
        },
      ],

      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'array-bracket-spacing': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      curly: ['error', 'all'],

      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],

      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],

      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
        },
      ],

      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      semi: ['error', 'always'],
      'space-before-blocks': ['error', 'always'],

      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],

      'no-console': 'error',
      'no-constant-condition': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-return-await': 'error',
      'no-unused-vars': 'off',
      'no-var': 'error',

      complexity: [
        'off',
        {
          max: 10,
        },
      ],

      'max-depth': [
        'error',
        {
          max: 4,
        },
      ],

      'max-lines': [
        'off',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      'max-lines-per-function': [
        'off',
        {
          max: 80,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],

      'max-params': [
        'warn',
        {
          max: 5,
        },
      ],

      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],

      'no-lonely-if': 'error',

      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],

      'no-negated-condition': 'warn',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',

      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false,
        },
      ],

      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      yoda: 'error',

      'import/extensions': ['error', 'never', { json: 'always', css: 'always', scss: 'always' }],
      'import/first': 'error',
      'import/max-dependencies': ['error', { max: 20 }],
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/no-cycle': 'off',
      'import/no-deprecated': 'warn',
      'import/no-duplicates': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-import-module-exports': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-default': 'error',
      'import/no-relative-packages': 'error',
      'import/no-self-import': 'error',
      'import/no-unassigned-import': ['error', { allow: ['**/*.css', '**/*.scss'] }],
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'index'], 'type', 'object'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',

      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],

      'react/jsx-fragments': ['error', 'syntax'],

      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
        },
      ],

      'react/jsx-no-leaked-render': 'error',

      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: true,
        },
      ],

      'react/jsx-pascal-case': 'error',
      'react/jsx-props-no-multi-spaces': 'error',

      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          reservedFirst: true,
        },
      ],

      'react/no-array-index-key': 'error',
      'react/no-danger': 'warn',
      'react/no-unsafe': 'error',
      'react/no-unstable-nested-components': 'warn',
      'react/prop-types': 'warn',
      'react/self-closing-comp': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'max-nested-callbacks': ['error', 3],
      'max-statements': ['error', 30],
      'max-statements-per-line': ['error', { max: 1 }],
      'no-param-reassign': 'error',
      'func-style': ['error', 'expression'],
    },
  },
]);

export default eslintConfig;
