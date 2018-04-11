const initialState = {
  hasErrored: false,
  isLoading: false,
  items: [],
};

function skills(state = initialState, action) {
  switch (action.type) {
    case 'SKILLS_HAS_ERRORED':
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
      };
    case 'SKILLS_IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SKILLS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        items: action.payload.slice(),
      };
    default:
      return state;
  }
}

export default skills;
