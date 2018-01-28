import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.scss';
import SunIcon from '../Icons/SunIcon';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer id="footer" className={styles.footer}>
				<section className={styles.cover}>
					<a href="#footer" className={styles.hireme}>
						Hire Me <SunIcon className={styles.hireme__icon} />
					</a>
				</section>
			</footer>
		);
	}
}
