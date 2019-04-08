var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    client : [
      '@babel/polyfill',
      // 'webpack-hot-middleware/client',
      './src/index.client.jsx'
    ],
    /* server : [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './src/index.server.jsx'
    ],*/
  },
  target: 'web',
  optimization: {
    minimize: false,
    /* splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    }, */
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    /* new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }), new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        compress: true
      }
    }), */
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [
        { loader: 'babel-loader'}
      ],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded'
          }
        }
      ]
    }, {
      test: /\.(jpg|png)$/,
      use: [
        {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
          }
        }
      ]
    }, {
      test: /\.(svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 25000,
          }
        }
      ]
    }]
  }
};
