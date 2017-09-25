import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.scss';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer className={styles.footer}>
				<section className={styles.cover}>
				</section>
			</footer>
		);
	}
}
