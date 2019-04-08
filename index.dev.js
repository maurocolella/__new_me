import dotenv from 'dotenv';
// import url from 'url';

import path from 'path';
import express from 'express';
import webpack from 'webpack';

import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import expressSession from 'express-session';

import config from './webpack.config';

import {
	renderToString
} from 'react-dom/server';
import {
	createIsomorphicWebpack
} from 'isomorphic-webpack';

dotenv.config();
const app = express();
const compiler = webpack(config);
// createIsomorphicWebpack(config);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/icons', express.static(path.join(__dirname, 'icons')));

// app.use(require('morgan')('combined'));
/* app.use(cookieParser());
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
	secret: 'candygram',
	resave: true,
	saveUninitialized: true,
	proxy: true, // add this line
})); */

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'trace'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('/'));

app.get('*', function(req, res) {
  // const appBody = renderToString(require('./src/index.server.jsx').default);
  // const content = render(req);
  res.render('index', { html: '' });
});

app.listen(3000, function(err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
