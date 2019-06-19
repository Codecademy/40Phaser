module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ["airbnb-base", "eslint-config-prettier"],
    globals: {
        Phaser: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "class-methods-use-this": 0,
        "import/extensions": 0,
        "no-param-reassign": 0,
    },
};
