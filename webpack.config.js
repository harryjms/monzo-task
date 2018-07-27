const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app/index.jsx',
  output: {
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      Components: path.join(__dirname, '/src/app/Components'),
      images: path.join(__dirname, '/src/images'),
      theme: path.join(__dirname, '/src/app/Theme/index.js'),
    },
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/html/index.html'),
    }),
  ],
};
