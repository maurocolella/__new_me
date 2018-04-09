import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { articlesFetchData } from './actions';

import Loader from '../../components/Loader';
import styles from '../../assets/styles/page.scss';

class ContentPage extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		this.props.fetchData('//api.mauro-colella.com/articles');
	}

	render() {
		const { isLoading, article } = this.props;

		return (
			(isLoading) ?
			<Loader className={styles.page} />
			:
			<main className={styles.page}>
				<header className={styles.page__header}>
					<h2 className={styles.page__title}>{article ? article.title : ''}</h2>
				</header>
				<article dangerouslySetInnerHTML={{__html: article ? article.body : ''}}>
				</article>
			</main>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { slug } = ownProps.match.params;
	const { articles } = state;
	const article = (articles !== undefined && articles.length) ? (slug === undefined) ? articles[0] : articles.filter((obj) => obj.slug === slug)[0] : {};

	return {
		hasErrored: state.articlesHasErrored,
		isLoading: state.articlesIsLoading,
		slug,
		article
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(articlesFetchData(url))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
