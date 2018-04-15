import getArticles from './services';

export function articlesHasErrored(bool) {
  return {
    type: 'ARTICLES_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function articlesIsLoading(bool) {
  return {
    type: 'ARTICLES_IS_LOADING',
    isLoading: bool,
  };
}

export function articlesFetchDataSuccess(articles) {
  return {
    type: 'ARTICLES_FETCH_DATA_SUCCESS',
    payload: articles,
  };
}

export function articlesFetchData() {
  return async (dispatch) => {
    dispatch(articlesIsLoading(true));

    try {
      const items = await getArticles();
      dispatch(articlesIsLoading(false));
      dispatch(articlesFetchDataSuccess(items));
    } catch (e) {
      dispatch(articlesHasErrored(true));
    }
  };
}
