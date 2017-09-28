import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.scss';
import SunIcon from '../Icons/SunIcon';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className={styles.header}>
				<section className={styles.cover}>
					<h1 className={styles.cover__title}>Mauro Colella</h1>
					<div className={styles.hireme}>
						Hire Me <SunIcon className={styles.hireme__icon} />
					</div>
				</section>
			</header>
		);
	}
}
