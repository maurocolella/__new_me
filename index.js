import path from 'path';
import webpack from 'webpack';
import express from 'express';
import config from './webpack.config';

import {
	renderToString
} from 'react-dom/server';
import {
	createIsomorphicWebpack
} from 'isomorphic-webpack';

const app = express();
const compiler = webpack(config);
createIsomorphicWebpack(config);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	// const render = require('./dist/server.js');
	// const html = render(req);
	// console.log(html);

	res.render('index', { html: '' });
});

app.listen(3000, function(err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
