import getResume from './services';

export function resumeHasErrored(bool) {
  return {
    type: 'RESUME_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function resumeIsLoading(bool) {
  return {
    type: 'RESUME_IS_LOADING',
    isLoading: bool,
  };
}

export function resumeFetchDataSuccess(resumeEntries) {
  return {
    type: 'RESUME_FETCH_DATA_SUCCESS',
    payload: resumeEntries,
  };
}

export function resumeFetchData() {
  return async (dispatch) => {
    dispatch(resumeIsLoading(true));

    try {
      const items = await getResume();
      dispatch(resumeIsLoading(false));
      dispatch(resumeFetchDataSuccess(items));
    } catch (e) {
      dispatch(resumeHasErrored(true));
    }
  };
}
