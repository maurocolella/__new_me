var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		client : [
			'webpack-hot-middleware/client',
			'babel-polyfill',
			'./src/index.client.jsx'
		],
		/* server : [
			'webpack-hot-middleware/client',
			'babel-polyfill',
			'./src/index.server.jsx'
		],*/
		vendor : [
			'bluebird',
			'react',
			'redux',
			'react-redux',
			'react-dom',
			'react-router-dom',
			'three'
		]
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // Specify the common bundle's name.
		})
	],
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: [
				{ loader: 'react-hot-loader' },
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
			test: /\.(jpg|png|svg)$/,
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
