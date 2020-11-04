const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "App.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/app_bundle.js",
    publicPath: "/"
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "RxVChicken",
      filename: "html/index.html",
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
    filename: "css/[name].css"
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
        use: [MiniCssExtractPlugin.loader, "css-loader", {loader: "postcss-loader", options: {postcssOptions: {
          plugins: [["autoprefixer"]]
        }}}]
      },
      {
        test: /\.s?css$/,
        loader: "sass-loader"
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: "file-loader",
        options: { outputPath: "css/" }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    index: "html/index.html",
    historyApiFallback: {
      index: "html/index.html"
    },
    watchContentBase: true
  }
};