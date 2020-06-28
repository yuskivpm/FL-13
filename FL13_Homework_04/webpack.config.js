/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IMG_PATH = path.join(__dirname, 'src', 'img');
const HTML_TEMPLATE_PATH = path.join('src', 'public', 'index.html');
const exclude = /node_modules/;
const JS_MASK = /\.js$/i;
const DEVELOPMENT = 'development';

module.exports = ({ NODE_ENV = DEVELOPMENT } = {}) => ({
  entry: {
    'js/app.js': './src/js/app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: NODE_ENV === DEVELOPMENT ? 'source-map' : false,
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: JS_MASK,
        exclude,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        enforce: 'pre',
        test: JS_MASK,
        exclude,
        loader: 'eslint-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'img',
          name: '[name].[ext]',
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE_PATH,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: IMG_PATH, to: 'img' }],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new ImageminPlugin({
      test: 'img/**',
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: JS_MASK,
      exclude,
      sourceMap: NODE_ENV === DEVELOPMENT,
    })],
  },
});
