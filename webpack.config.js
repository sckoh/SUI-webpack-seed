const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
    }, {
      test: /\.woff/,
      loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]',
    }, {
      test: /\.ttf/,
      loader: 'file?name=fonts/[name].[ext]',
    }, {
      test: /\.eot/,
      loader: 'file?name=fonts/[name].[ext]',
    }, {
      test: /fonts[\/\\].*\.svg/,
      loader: 'file?name=fonts/[name].[ext]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=es2015',
    }],
  },
  resolve: {
    root: [
      path.join(__dirname, 'bower_components'),
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.NoErrorsPlugin(),
  ],
};
