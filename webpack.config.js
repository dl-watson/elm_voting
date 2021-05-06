const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./client/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    hot: true,
    open: true,
    port: 7891,
    proxy: {
      "/socket.io": {
        target: "http://localhost:7890",
        ws: true,
      },
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
          options: {
            debug: true,
          },
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
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader",
          options: { limit: 100000 },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
