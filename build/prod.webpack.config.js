const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.load();

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [path.resolve('src', 'scripts', 'main.js')],
    '2019-01-21-uzupio': [
      path.resolve('src', 'scripts', '2019-01-21-uzupio.js'),
    ],
  },
  output: {
    path: path.resolve('static'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=8192',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin({
      profile: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  stats: {
    colors: true,
  },
};
