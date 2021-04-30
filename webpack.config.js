const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  devtool: "inline-source-map",
  mode: "development",
  output: {
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    port: 7890,
    proxy: {
      "/socket.io": "http://localhost:7890",
    },
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: "elm-webpack-loader",
          options: {},
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: { limit: 100000 },
        },
      },
    ],
  },
};
