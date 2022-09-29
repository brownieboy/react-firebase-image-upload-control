const path = require("path");

const TARGET = process.env.npm_lifecycle_event;
const DEVMODE = TARGET === "start";

module.exports = {
  entry: "./src/index.js",
  mode: DEVMODE ? "development" : "production",
  devtool: DEVMODE ? "eval-source-map" : "cheap-source-map",
  output: {
    path:
      TARGET === "start"
        ? path.resolve(__dirname, "..", "demo", "src", "package")
        : path.resolve(__dirname, "../dist"),
    filename: "index.js",
  },
};
