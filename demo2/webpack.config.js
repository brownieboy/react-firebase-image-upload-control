const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "React-18_Boiler-Plate",
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]?[chunkhash]",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
   /* fallback: {
      // assert: require.resolve('assert'),
      // "url": require.resolve("url/"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve('stream-http'),
      https: require.resolve("https-browserify"),
      // os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve("buffer/"),
      // "zlib": require.resolve("browserify-zlib")
    }, */
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3080,
    open: true,
  },
};
