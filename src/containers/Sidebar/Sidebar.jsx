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
						Lorem
					</li>
					<li className={styles.nav__item}>
						Ipsum
					</li>
					<li className={styles.nav__item}>
						Dolor
					</li>
					<li className={styles.nav__item}>
						Sit
					</li>
					<li className={styles.nav__item}>
						Amet
					</li>
				</ul>
			</section>);
	}
}
