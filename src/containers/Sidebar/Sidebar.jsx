import React, { Component } from 'react';
import styles from './Sidebar.scss';

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<section className={styles.sidebar}>
				<ul className={styles.nav}>
					<li className={styles.nav__item}>
						About
					</li>
					<li className={styles.nav__item}>
						Skills
					</li>
					<li className={styles.nav__item}>
						Work
					</li>
					<li className={styles.nav__item}>
						Play
					</li>
					<li className={styles.nav__item}>
						Contact
					</li>
				</ul>
			</section>);
	}
}
