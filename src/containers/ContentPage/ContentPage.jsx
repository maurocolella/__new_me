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
		const { item } = this.props;

		return (
			<main className={styles.page}>
				<header className={styles.page__header}>
					<h2 className={styles.page__title}>{item ? item.title : ''}</h2>
				</header>
				<article dangerouslySetInnerHTML={{__html: item ? item.body : ''}}>
				</article>
			</main>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { slug } = ownProps.match.params;
	const { items } = state;
	const item = (items.length) ? (slug === undefined) ? items[0] : items.filter((obj) => obj.slug === slug)[0] : {};

	return {
		// items: state.items,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		slug,
		item
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(itemsFetchData(url))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
