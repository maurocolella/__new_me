import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import styles from '../../assets/styles/page.scss';

export default class ContentPage extends React.Component {
	constructor(props) {
		super(props);

		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData('http://api.dev.home/articles');
	}

	fetchData(url) {
		this.setState({ isLoading: true });

		fetch(url)
			.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			this.setState({ isLoading: false });

			return response;
		})
			.then((response) => response.json())
			.then((items) => {
				console.log(items);
				this.setState({ items });
			})
			.catch(() => this.setState({ hasErrored: true }));
	}

	render() {
		return (
			<main className={styles.page}>
				<header className={styles.page__header}>
					<h2 className={styles.page__title}>About Me</h2>
				</header>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum ultricies erat, at luctus lacus dapibus et. Nam eu molestie felis. Sed id pretium metus. Fusce a orci aliquet, gravida ante eget, consequat est. Donec pharetra eu urna vel molestie. Maecenas a lorem aliquam, vulputate dui sit amet, condimentum nisi. Vestibulum sit amet turpis laoreet, sodales libero venenatis, dignissim lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse imperdiet eros a blandit commodo. Suspendisse potenti. Aenean consequat ultricies ipsum in pulvinar. Morbi euismod risus vel nisl rhoncus, eleifend condimentum eros eleifend. Vivamus augue purus, sodales eu ante sit amet, lobortis iaculis ipsum. Maecenas sit amet augue quis nibh lobortis condimentum.
				</p>
				<br/>
				<p>
					Phasellus at quam dignissim, semper ligula id, consectetur velit. Fusce ex eros, auctor id est vel, molestie placerat erat. Praesent volutpat ligula interdum commodo placerat. Morbi at porta metus. Quisque turpis urna, auctor a ipsum a, commodo auctor dui. Suspendisse pulvinar enim arcu, sed facilisis tortor pretium eget. Nunc eu turpis ac eros condimentum dictum ut ac lorem. Mauris sodales egestas dolor, et molestie sapien porttitor ac. Cras massa nisl, dapibus eu diam sit amet, ornare dignissim magna.
				</p>
			</main>
		);
	}
}
