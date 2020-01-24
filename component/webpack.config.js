const path = require("path");
const TARGET = process.env.npm_lifecycle_event;

const OUTPUTPATH = path.resolve(__dirname, "..", "examples", "src", "component");
console.log("TCL: OUTPUTPATH", OUTPUTPATH);

module.exports = {
  entry: "./src/index.js",
  output: {
    path:
      TARGET === "buildforexamples"
        ? path.resolve(__dirname, "..", "examples", "src", "component")
        : path.resolve(__dirname, "../dist"),
    filename: "index.js"
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
  }
};
