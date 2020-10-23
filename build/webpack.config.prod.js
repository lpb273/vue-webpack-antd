const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const prodConfig = require('../config/prod.env');
const OptimizeCss =  require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const utils = require('./utils');

module.exports = merge(baseConfig,{
  mode: "production",
  optimization: {
    minimizer: [
      new OptimizeCss(),
      new UglifyJsPlugin({
        sourceMap: true,
        include: /\/includes/,
        cache: true
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules\/(.*)\.js/,
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
          reuseExistingChunk: false,
        },
        styles: {
          name: 'common',
          chunks: 'all',
          test: /\.(scss|css)$/,
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        common: {
          name: 'common',
          chunks: 'all',
          test: /[\\/]src[\\/]js[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
        }
      }
    },
    runtimeChunk: {
      name: 'manifest',
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': prodConfig
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