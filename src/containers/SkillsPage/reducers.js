export function skillsHasErrored(state = false, action) {
  switch (action.type) {
    case 'SKILLS_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function skillsIsLoading(state = false, action) {
  switch (action.type) {
    case 'SKILLS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function skills(state = [], action) {
  switch (action.type) {
    case 'SKILLS_FETCH_DATA_SUCCESS':
      return action.skills;

    default:
      return state;
  }
}
