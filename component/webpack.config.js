const path = require("path");
const webpack = require("webpack");

const TARGET = process.env.npm_lifecycle_event;
const DEVMODE = TARGET === "buildforexamples";

let plugins = [];
if (DEVMODE) {
  // Necessary because otherwise Create React App will lint the file and fail to
  // build due to "define is undefined" error
  plugins = [
    new webpack.BannerPlugin({
      banner: "/* eslint-disable */",
      raw: true
    })
  ];
}

module.exports = {
  entry: "./src/index.js",
  mode: DEVMODE ? "development" : "production",
  output: {
    path:
      TARGET === "buildforexamples"
        ? path.resolve(__dirname, "..", "rfiu-examples", "src", "component")
        : path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: "rfiu",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins
};
