import path from 'path';
import webpack from 'webpack';
import express from 'express';
import passport from 'passport';
import Strategy from 'passport-facebook';
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

passport.use(new Strategy({
	clientID: '139609183399646', //process.env.CLIENT_ID,
	clientSecret: '064fae7cdc9cca2cfd34cfaeac6cefc1', // process.env.CLIENT_SECRET,
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
						  function(accessToken, refreshToken, profile, cb) {
	// In this example, the user's Facebook profile is supplied as the user
	// record.  In a production-quality application, the Facebook profile should
	// be associated with a user record in the application's database, which
	// allows for account linking and authentication with other identity
	// providers.
	return cb(null, profile);
}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('*', function(req, res) {
	// const appBody = renderToString(require('./src/App.jsx').default);
	// const html = render(req);
	// console.log(appBody);

	res.render('index', { html: '' });
});

app.listen(3000, function(err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
