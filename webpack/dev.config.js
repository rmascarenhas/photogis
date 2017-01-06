const webpack = require('webpack');
const config = require('../webpack.config');

config.plugins = [
  new webpack.DefinePlugin({
    API_URL: JSON.stringify('http://localhost:9292')
  })
]

module.exports = config;
