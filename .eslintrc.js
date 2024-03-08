module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    JSX: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
  ],
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      },
    },
  ],
  rules: {
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-is-valid': 'off', // This rule is not compatible with Next.js's <Link /> components
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/display-name': ['off', { ignoreTranspilerName: true }],
    // typescript-eslint rules
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-for-in-array': 'error',
    // eslint rules
    'react-hooks/exhaustive-deps': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'max-params': ['error', 4],
    'no-alert': 'error',
    'max-depth': ['error', 3],
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-console': 'error',
    'no-delete-var': 'error',
    'no-empty': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extend-native': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-plusplus': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-undef-init': 'error',
    'no-undef': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'no-with': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'strict': ['error', 'global'],
    'symbol-description': 'error',
    'yoda': 'error',
    'consistent-return': 'warn',
    'func-names': ['error', 'always'],
    'no-param-reassign': 'error',
    'no-shadow-restricted-names': 'error',
  },
};
