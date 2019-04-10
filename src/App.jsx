import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import sscache from 'session-storage-cache';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import ReactGA from 'react-ga';
import ScrollProvider from './lib/ScrollContext';

import 'normalize.css';
import './assets/styles/typeplate.scss';
import styles from './App.scss';

import Dashboard from './containers/Dashboard';
import PrintableResumePage from './containers/PrintableResumePage';
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

class App extends Component {
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
          <Switch>
            <Route exact path="/resume/print" component={PrintableResumePage} />
            <Route>
              <ScrollProvider>
                <span style={{ width: '100%' }}>
                  <Navbar />
                  <Dashboard />
                  {!noticeDelivered && <CookieNotice />}
                </span>
              </ScrollProvider>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(App);
