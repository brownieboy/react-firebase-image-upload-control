/* eslint-env node */
const path = require("path");

const TARGET = process.env.npm_lifecycle_event;
const DEVMODE = TARGET === "start";

module.exports = {
  entry: "./src/index.js",
  mode: DEVMODE ? "development" : "production",
  devtool: DEVMODE ? "eval-source-map" : "cheap-source-map",
  target: "node",
  externals: {
    firebase: "firebase",
    "firebase/storage": "firebase/storage",
    react: "react",
    "react-dom": "react-dom",
  },
  externalsPresets: {
    node: true, // in order to ignore built-in modules like path, fs, etc.
  },
  output: {
    path:
      TARGET === "start"
        ? path.resolve(__dirname, "..", "demo", "src", ".package")
        : path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: "rfiu",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
