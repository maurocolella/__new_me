import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.scss';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className={styles.header}>
				<section className={styles.cover}>
					<h1 className={styles.cover__title}>Mauro Colella</h1>
				</section>
			</header>
		);
	}
}
