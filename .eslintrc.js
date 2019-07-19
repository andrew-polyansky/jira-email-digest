module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'script', // modules are not yet supported by Node.js
    },
    extends: 'eslint-config-airbnb-base',
    env: {
        node: true,
        mocha: true,
    },
};
