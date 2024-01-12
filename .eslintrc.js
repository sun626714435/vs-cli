module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-strongly-recommended',
    'standard',
    'airbnb-base',
    'prettier',
  ],
  rules: {
    'no-shadow': 'off',
    'no-bitwise': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'padded-blocks': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': ['warn', { ignore: ['^@/'] }],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
        maxEmptyLines: 1,
      },
    ],
    'vue/attribute-hyphenation': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'space-before-function-paren': 0,
    'vue/require-default-prop': 'off',
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', '.vue'],
      },
    },
  },
  parser: 'vue-eslint-parser',
  globals: {
    JSX: 'readonly',
    VSCLI: 'readonly',
  },
  // 支持ts的最新语法
  plugins: ['vue', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
}
