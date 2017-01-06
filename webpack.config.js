const path = require('path');
const webpack = require('webpack');

const entryPath = path.join(__dirname, 'app/react/index.jsx');
const assetsPath = path.join(__dirname, 'public/');

module.exports = {
  entry: entryPath,
  output: {
    path: assetsPath,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
