import React, { Component } from 'react';
import 'smoothscroll-polyfill';

import styles from './Header.scss';
import SunIcon from '../Icons/SunIcon';

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.scrollTo = this.scrollTo.bind(this);
	}

	scrollTo(event) {
		event.preventDefault();
		const target = event.target.getAttribute('href');

		if (document) {
			document.querySelector(target).scrollIntoView({
				behavior: 'smooth'
			});
		}
	}

	render() {
		return (
			<header className={styles.header}>
				<section className={styles.cover}>
					<h1 className={styles.cover__title}>Mauro Colella</h1>
					<div className={styles.hireme}>
						<a href="#footer" onClick={this.scrollTo}>
							Hire Me <SunIcon className={styles.hireme__icon} />
						</a>
					</div>
				</section>
			</header>
		);
	}
}
