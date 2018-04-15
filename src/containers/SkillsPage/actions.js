import getSkills from './services';

export function skillsHasErrored(bool) {
  return {
    type: 'SKILLS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function skillsIsLoading(bool) {
  return {
    type: 'SKILLS_IS_LOADING',
    isLoading: bool,
  };
}

export function skillsFetchDataSuccess(skills) {
  return {
    type: 'SKILLS_FETCH_DATA_SUCCESS',
    payload: skills,
  };
}

export function skillsFetchData() {
  return async (dispatch) => {
    dispatch(skillsIsLoading(true));

    try {
      const items = await getSkills();
      dispatch(skillsIsLoading(false));
      dispatch(skillsFetchDataSuccess(items));
    } catch (e) {
      dispatch(skillsHasErrored(true));
    }
  };
}
