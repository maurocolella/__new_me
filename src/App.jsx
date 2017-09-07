import React, { Component } from 'react';

import cssreset from 'normalize.css';
import typography from './typeplate.css';
import styles from './global.scss';

import Sidebar from './containers/Sidebar';
import Dashboard from './containers/Dashboard';

export default class App extends Component {
	render() {
		return (
			<div className={styles.page}>
				<Sidebar />
				<Dashboard />
			</div>
		);
	}
}
