var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
// var serverRender = require('./src/index.server.jsx');

var app = express();
var compiler = webpack(config);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {

	res.render('index', { html: '' });
});

app.listen(3000, function(err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
