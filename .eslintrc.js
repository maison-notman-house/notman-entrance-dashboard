module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "warn"
        ],
        "no-unused-vars": [
             "error", {
                 "args": "none"
             }
        ],
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1
    },
    "plugins": [
        "react"
    ]
};