const webpack = require('webpack');
const config = require('../webpack.config');

const env = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  API_URL: JSON.stringify('...')
};

config.plugins = [
  new webpack.DefinePlugin(env),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

module.exports = config;
