import React, { Component } from 'react';
import styles from './Dashboard.css';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentWillUnmount() {
	}

	render() {
		return <section className={styles.dashboard}>
				<h1 className={styles.dashboard__title}>TOAST</h1>
		</section>;
	}
}
