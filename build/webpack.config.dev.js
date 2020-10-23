const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const devConfig = require('../config/dev.env');
const path = require('path');

module.exports = merge(baseConfig,{
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 9000,
    hot: true,
    open: true,
    clientLogLevel: 'warning',
    overlay: { warnings: false, errors: true }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': devConfig
    })
  ]
})