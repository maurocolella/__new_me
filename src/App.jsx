import React, { Component } from 'react';
import sscache from 'session-storage-cache';
import {
  Router,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

import 'normalize.css';
import './assets/styles/typeplate.scss';
import styles from './App.scss';

import Dashboard from './containers/Dashboard';
import Navbar from './components/Navbar';

sscache.flush();

// Initialize history.
const history = createHistory();
ReactGA.initialize('UA-9138282-16');

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className={styles.app}>
          <Navbar />
          <Dashboard />
        </div>
      </Router>
    );
  }
}
