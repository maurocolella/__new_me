import getWorks from './services';

export function worksHasErrored(bool) {
  return {
    type: 'WORKS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function worksIsLoading(bool) {
  return {
    type: 'WORKS_IS_LOADING',
    isLoading: bool,
  };
}

export function worksFetchDataSuccess(worksEntries) {
  return {
    type: 'WORKS_FETCH_DATA_SUCCESS',
    payload: worksEntries,
  };
}

export function worksFetchData() {
  return async (dispatch) => {
    dispatch(worksIsLoading(true));

    try {
      const items = await getWorks();
      dispatch(worksIsLoading(false));
      dispatch(worksFetchDataSuccess(items));
    } catch (e) {
      dispatch(worksHasErrored(true));
    }
  };
}
