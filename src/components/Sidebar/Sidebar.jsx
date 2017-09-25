import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.scss';

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className={styles.sidebar}>
				<ul className={styles.nav}>
					<li className={styles.nav__item}>
						<Link className={styles.nav__link} to="/about">About</Link>
					</li>
					<li className={styles.nav__item}>
						<Link className={styles.nav__link} to="/skills">Skills</Link>
					</li>
					<li className={styles.nav__item}>
						<Link className={styles.nav__link} to="/work">Work</Link>
					</li>
					<li className={styles.nav__item}>
						<Link className={styles.nav__link} to="/play">Play</Link>
					</li>
					<li className={styles.nav__item}>
						<Link className={styles.nav__link} to="/contact">Contact</Link>
					</li>
				</ul>
			</section>);
	}
}
