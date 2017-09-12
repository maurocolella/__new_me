import React, { Component } from 'react';

import cssreset from 'normalize.css';
import typography from './assets/styles/typeplate.scss';
import styles from './App.scss';

import Dashboard from './containers/Dashboard';
import Sidebar from './containers/Sidebar';

export default class App extends Component {
	render() {
		return (
			<div className={styles.app}>
				<Sidebar />
				<Dashboard />
			</div>
		);
	}
}
