const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "../index.js"],
  devtool: "inline-source-map",
  mode: "development",
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    publicPath: "/",
    port: 7890,
    open: true,
    hotOnly: true,
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
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

        use: [
          {
            loader: "elm-webpack-loader",
            options: {},
          },
        ],
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
