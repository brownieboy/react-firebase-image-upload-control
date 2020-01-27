const path = require("path");
const webpack = require("webpack");

const TARGET = process.env.npm_lifecycle_event;
const DEVMODE = TARGET === "start";

let plugins = [];
if (DEVMODE) {
  // Necessary to insert the /* eslint-disble */ comment at the top of the
  // transpiled file in Dev Mode.  Otherwise Create React App will lint the file
  // and fail to build due to "define is undefined" error.  (There's no way of
  // turning this off in Create React App without ejecting.)
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
      DEVMODE
        ? path.resolve(__dirname, "..", "rfiu-examples", "src", "component")
        : path.resolve(__dirname, "./dist"),
    filename: "react-firebase-image-uploader.js",
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
