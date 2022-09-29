/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
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
      raw: true,
    }),
  ];
}

module.exports = {
  entry: "./src/index.js",
  mode: DEVMODE ? "development" : "production",
  devtool: DEVMODE ? "eval-source-map" : "cheap-source-map",
  externals: {
    firebase: "firebase",
    react: "react",
    "react-dom": "react-dom",
  },
  output: {
    path:
      TARGET === "start"
        ? path.resolve(__dirname, "..", "demo", "src", "package")
        : path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: "rfiu",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
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
  plugins,
};
