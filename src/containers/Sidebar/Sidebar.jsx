import React, { Component } from 'react';
import styles from './Sidebar.css';

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
				<ul>
					<li>
						Lorem
					</li>
					<li>
						Ipsum
					</li>
				</ul>
			</section>);
	}
}
