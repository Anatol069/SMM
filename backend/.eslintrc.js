module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'prettier/prettier': ['error'],
        'no-unused-vars': ['error', { 'args': 'none' }],
    },
};
