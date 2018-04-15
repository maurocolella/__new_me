import React, { Component } from 'react';
import sscache from 'session-storage-cache';

import 'normalize.css';
import './assets/styles/typeplate.scss';
import styles from './App.scss';

import Dashboard from './containers/Dashboard';
import Navbar from './components/Navbar';

sscache.flush();

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Navbar />
        <Dashboard />
      </div>
    );
  }
}
