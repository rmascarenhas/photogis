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
  plugins: [
    new webpack.DefinePlugin({
      // TODO configurable per environment
      API_URL: JSON.stringify('http://localhost:9292')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
