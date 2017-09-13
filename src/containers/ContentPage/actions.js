import 'isomorphic-fetch';
import 'bluebird';

export function articlesHasErrored(bool) {
	return {
		type: 'ARTICLES_HAS_ERRORED',
		hasErrored: bool
	};
}

export function articlesIsLoading(bool) {
	return {
		type: 'ARTICLES_IS_LOADING',
		isLoading: bool
	};
}

export function articlesFetchDataSuccess(articles) {
	return {
		type: 'ARTICLES_FETCH_DATA_SUCCESS',
		articles
	};
}

export function articlesFetchData(url) {
	return (dispatch) => {
		dispatch(articlesIsLoading(true));

		fetch(url)
			.then((response) => {
			dispatch(articlesIsLoading(false));

			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response;
		})
			.then((response) => response.json())
			.then((items) => dispatch(articlesFetchDataSuccess(items)))
			.catch(() => dispatch(articlesHasErrored(true)));
	};
}
