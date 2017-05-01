module.exports = {
    "parser": "babel-eslint",
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "env": {
        "node": true,
        "es6": true
    },
    "rules": {
        "indent" : [2, 4],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};