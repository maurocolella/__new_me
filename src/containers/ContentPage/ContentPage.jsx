import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions';

import styles from '../../assets/styles/page.scss';

class ContentPage extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		this.props.fetchData('http://api.dev.home/articles');
	}

	render() {
		const { slug } = this.props;
		const item = (slug) ? this.props.items.filter((obj) => obj.slug === slug)[0] : {};

		console.log(slug, item);

		return (
			<main className={styles.page}>
				<header className={styles.page__header}>
					<h2 className={styles.page__title}>{item ? item.title : ''}</h2>
				</header>
				{item ? item.body : ''}
			</main>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		items: state.items,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		slug: ownProps.match.params.slug
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(itemsFetchData(url))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
