const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app/index.jsx',
  output: {
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/html/index.html')
    })
  ]
};
