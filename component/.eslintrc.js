/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ["plugin:react/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.mts", "*.cts", "*.tsx"],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    "no-undef": "error",
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
