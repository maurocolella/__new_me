import getProfile from './services';

export function profileHasErrored(bool) {
  return {
    type: 'PROFILE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function profileIsLoading(bool) {
  return {
    type: 'PROFILE_IS_LOADING',
    isLoading: bool,
  };
}

export function profileFetchDataSuccess(profile) {
  return {
    type: 'PROFILE_FETCH_DATA_SUCCESS',
    payload: profile,
  };
}

export function profileFetchData() {
  return async (dispatch) => {
    dispatch(profileIsLoading(true));

    try {
      const items = await getProfile();
      dispatch(profileIsLoading(false));
      dispatch(profileFetchDataSuccess(items));
    } catch (e) {
      dispatch(profileHasErrored(true));
    }
  };
}
