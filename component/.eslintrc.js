module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  overrides: [],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    "no-unused-vars": ["warn"],
    "react/prop-types": ["warn"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
