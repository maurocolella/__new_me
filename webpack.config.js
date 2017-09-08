var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		app : [
			'webpack-hot-middleware/client',
			'./src/index.jsx'
		],
		/* vendor : [
			'react',
			'react-dom',
			'react-router-dom'
		] */
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: '[name].bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new UglifyJSPlugin({
			uglifyOptions: {
				ie8: false,
				compress: true
			} , sourceMap: false
		}) /*,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' // Specify the common bundle's name.
		})*/
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			loader: 'style-loader'
		}, {
			test: /\.css$/,
			loader: 'css-loader',
			query: {
				modules: true,
				localIdentName: '[name]__[local]___[hash:base64:5]'
			}
		}, {
			test: /\.scss$/,
			loader: 'style-loader'
		}, {
			test: /\.scss$/,
			loader: 'css-loader',
			query: {
				modules: true,
				localIdentName: '[name]__[local]___[hash:base64:5]'
			}
		}, {
			test: /\.scss$/,
			loader: 'sass-loader',
			query: {
				outputStyle: 'expanded'
			}
		}, {
			test: /\.(jpg|png|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 25000,
			}
		}]
	}
};
