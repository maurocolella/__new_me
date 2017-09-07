import React, { Component } from 'react';
import styles from './Dashboard.css';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className={styles.dashboard__wrapper}>
				<header className={styles.header}>
					<section className={styles.cover}>
						<h1 className={styles.cover__title}>Mauro Colella</h1>
					</section>
				</header>
				<main className={styles.dashboard}>
					<header className={styles.dashboard__header}>
						<h2 className={styles.dashboard__title}>About Me</h2>
					</header>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum ultricies erat, at luctus lacus dapibus et. Nam eu molestie felis. Sed id pretium metus. Fusce a orci aliquet, gravida ante eget, consequat est. Donec pharetra eu urna vel molestie. Maecenas a lorem aliquam, vulputate dui sit amet, condimentum nisi. Vestibulum sit amet turpis laoreet, sodales libero venenatis, dignissim lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse imperdiet eros a blandit commodo. Suspendisse potenti. Aenean consequat ultricies ipsum in pulvinar. Morbi euismod risus vel nisl rhoncus, eleifend condimentum eros eleifend. Vivamus augue purus, sodales eu ante sit amet, lobortis iaculis ipsum. Maecenas sit amet augue quis nibh lobortis condimentum.
					</p>
					<br/>
					<p>
						Phasellus at quam dignissim, semper ligula id, consectetur velit. Fusce ex eros, auctor id est vel, molestie placerat erat. Praesent volutpat ligula interdum commodo placerat. Morbi at porta metus. Quisque turpis urna, auctor a ipsum a, commodo auctor dui. Suspendisse pulvinar enim arcu, sed facilisis tortor pretium eget. Nunc eu turpis ac eros condimentum dictum ut ac lorem. Mauris sodales egestas dolor, et molestie sapien porttitor ac. Cras massa nisl, dapibus eu diam sit amet, ornare dignissim magna.
					</p>
				</main>
			</div>);
	}
}
