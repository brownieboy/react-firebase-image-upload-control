module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended"],
  overrides: [],
  // parser: "@babel/eslint-parser",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    "no-unused-vars": ["warn"],
    "react/prop-types": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
