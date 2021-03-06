import React, { Suspense } from 'react';
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
import PerfProvider from './lib/PerfContext';

import 'normalize.css';
import './assets/styles/typeplate.scss';
import styles from './App.scss';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CookieNotice from './components/CookieNotice';

const Dashboard = React.lazy(() => import('./containers/Dashboard'));

sscache.flush();

// Initialize history.
const history = createHistory();
ReactGA.initialize('UA-9138282-16');
ReactGA.set({ anonymizeIp: true });

history.listen((location) => {
  const cookiesAccepted = localStorage ? localStorage.getItem('cookiesAccepted') : false;
  if (!cookiesAccepted) {
    return;
  }
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

function App() {
  return (
    <Router history={history}>
      <div className={styles.app}>
        <Switch>
          <Route>
            <PerfProvider>
              <ScrollProvider>
                <>
                  <Navbar />
                  <Suspense fallback={<Loader />}>
                    <Dashboard />
                  </Suspense>
                  <CookieNotice />
                </>
              </ScrollProvider>
            </PerfProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default hot(App);
