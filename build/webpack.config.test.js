const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const testConfig = require('../config/test.env');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const utils = require('./utils');

module.exports = merge(baseConfig,{
  mode: "none",
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': testConfig
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
    new BundleAnalyzerPlugin({ analyzerPort: 9001 }),
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