import React, { Component } from 'react';
import sscache from 'session-storage-cache';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

import 'normalize.css';
import './assets/styles/typeplate.scss';
import styles from './App.scss';

import Dashboard from './containers/Dashboard';
import Navbar from './components/Navbar';
import CookieNotice from './components/CookieNotice';

sscache.flush();

// Initialize history.
const history = createHistory();
ReactGA.initialize('UA-9138282-16');
ReactGA.set({ anonymizeIp: true });

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
  window.scrollTo({
    top: 0,
    left: 0,
  });
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noticeDelivered: localStorage ? localStorage.getItem('noticeDelivered') : null,
    };
  }

  render() {
    const { noticeDelivered } = this.state;

    return (
      <Router history={history}>
        <div className={styles.app}>
          <Navbar />
          <Dashboard />
          {noticeDelivered ? null : <CookieNotice />}
        </div>
      </Router>
    );
  }
}
