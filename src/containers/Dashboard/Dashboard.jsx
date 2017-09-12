import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import styles from './Dashboard.scss';
import ContentPage from '../ContentPage';
import SkillsPage from '../SkillsPage';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<section className={styles.cover}>
						<h1 className={styles.cover__title}>Mauro Colella</h1>
					</section>
				</header>
				<Route exact path="/skills" component={SkillsPage} />
				<Route exact path="/:slug?" component={ContentPage} />
			</div>);
	}
}
