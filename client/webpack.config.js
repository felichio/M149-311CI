const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path');
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "App.js"),
  output: {
    path: path.join(__dirname, "public"),
    filename: "app_bundle.js",
    publicPath: "/"
    
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      title: "RxVChicken",
      filename: "index.html",
      template: path.join(__dirname, "config", "template.html"),
      minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
      },
  }),
    new MiniCssExtractPlugin({
    filename: "[name].css",
  })],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      },
      {
        test: /\.s?css$/,
        
        use: [{loader: MiniCssExtractPlugin.loader, options: {publicPath: "/"}}, "css-loader", {loader: "postcss-loader", options: {postcssOptions: {
          plugins: [["autoprefixer"]]
        }}}]
      },
      {
        test: /\.s?css$/,
        loader: "sass-loader"
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
        
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
   
    // publicPath: "/",
    proxy: {
      "/api": "http://localhost:8000"
    },
    historyApiFallback: true,
    watchContentBase: true,
  }
};