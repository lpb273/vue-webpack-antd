const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const utils = require('./utils');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[name].[hash].js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve('src')
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: utils.resolve('public/index.html'),
      filename: 'index.html',
      title: 'EDU'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.processDevMode ? utils.assetsPath('css/[name].css') : utils.assetsPath('css/[name].[hash].css'),
      chunkFilename: utils.processDevMode ? utils.assetsPath('css/[name].css') : utils.assetsPath('css/[name].[hash].css')
    })
  ],
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader': MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 3000,
      //         esModule: false,
      //         fallback: require.resolve('file-loader')
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              esModule: false,
              outputPath: utils.assetsPath('images')
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader': MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}