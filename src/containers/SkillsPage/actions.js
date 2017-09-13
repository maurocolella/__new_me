import 'isomorphic-fetch';
import 'bluebird';

export function skillsHasErrored(bool) {
	return {
		type: 'SKILLS_HAS_ERRORED',
		hasErrored: bool
	};
}

export function skillsIsLoading(bool) {
	return {
		type: 'SKILLS_IS_LOADING',
		isLoading: bool
	};
}

export function skillsFetchDataSuccess(skills) {
	return {
		type: 'SKILLS_FETCH_DATA_SUCCESS',
		skills
	};
}

export function skillsFetchData(url) {
	return (dispatch) => {
		dispatch(skillsIsLoading(true));

		fetch(url)
			.then((response) => {
			dispatch(skillsIsLoading(false));

			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response;
		})
			.then((response) => response.json())
			.then((items) => {
				dispatch(skillsFetchDataSuccess(items))
			})
			.catch(() => dispatch(skillsHasErrored(true)));
	};
}
