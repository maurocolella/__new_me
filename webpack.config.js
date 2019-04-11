const path = require('path');
const webpack = require('webpack');
const sharpLoader = require('responsive-loader/sharp');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env['NODE_ENV'];

module.exports = {
  mode: env,
  devtool: env === 'development' ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  entry: {
    client : [
      '@babel/polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.client.jsx'
    ],
    /* server : [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.server.jsx'
    ],*/
  },
  target: 'web',
  optimization: {
    minimize: env !== 'development',
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
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new BundleAnalyzerPlugin({
      analyzerMode: env === 'development' ? 'disabled' : 'static',
      openAnalyzer: false,
      reportFilename: '../report.html',
    }),
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
            adapter: sharpLoader,
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
