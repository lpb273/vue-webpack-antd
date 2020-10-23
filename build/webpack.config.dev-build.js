const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const devConfig = require('../config/dev.env');
const CopyPlugin = require('copy-webpack-plugin');
const utils = require('./utils');

module.exports = merge(baseConfig,{
  mode: "none",
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': devConfig
    }),
    new CopyPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: utils.resolve('dist/static'),
          toType: 'dir'
        }
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        configureWebpack: {
          performance: {
            hints:'warning',
            maxEntrypointSize: 50000,
            maxAssetSize: 30000,
            assetFilter: function(assetFilename) {
              return assetFilename.endsWith('.js');
            }
          }
        }
      }
    })
  ]
})