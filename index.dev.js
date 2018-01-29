import dotenv from 'dotenv';
import url from 'url';

import path from 'path';
import express from 'express';
import webpack from 'webpack';

import passport from 'passport';
import Strategy from 'passport-facebook';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import expressSession from 'express-session';
import { ensureLoggedIn } from 'connect-ensure-login';

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

passport.use(new Strategy({
	clientID: process.env.FB_CLIENT_ID,
	clientSecret: process.env.FB_CLIENT_SECRET,
	callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`
},
						  function(accessToken, refreshToken, profile, cb) {
	// In this example, the user's Facebook profile is supplied as the user
	// record.  In a production-quality application, the Facebook profile should
	// be associated with a user record in the application's database, which
	// allows for account linking and authentication with other identity
	// providers.
	return cb(null, profile);
}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

app.set('views', './src/views');
app.set('view engine', 'ejs');

// app.use(require('morgan')('combined'));
app.use(cookieParser());
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
	secret: 'candygram',
	resave: true,
	saveUninitialized: true,
	proxy: true, // add this line
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/login/facebook',
		passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

app.get('*', /* ensureLoggedIn('/login'),*/ function(req, res) {
	// const appBody = renderToString(require('./src/App.jsx').default);
	// const html = render(req);
	// console.log(appBody);

	if( req.isAuthenticated() ){
		res.render('index', { html: '' });
	}
	else{
		res.redirect('/login');
	}
});

app.listen(3000, function(err) {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:3000/');
});
