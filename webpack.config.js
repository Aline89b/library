const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin} = require("clean-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = (env,argv) => {
  const entryPath =
    argv.mode === "development" ? "./src/index_dev.js" : "./src/index.js";
  return {
    entry:{
      main: path.resolve(__dirname,entryPath),
    },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]},

  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: path.resolve(__dirname,"./src/index.html")}),
    new Dotenv(),
  ],
  devServer:{
    static: "./dist",
    open: true,
    },
  }
}
