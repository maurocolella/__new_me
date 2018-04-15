const initialState = {
  hasErrored: false,
  isLoading: false,
  items: [],
};

function resume(state = initialState, action) {
  switch (action.type) {
    case 'RESUME_HAS_ERRORED':
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
      };
    case 'RESUME_IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'RESUME_FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        items: action.payload.slice(),
      };
    default:
      return state;
  }
}

export default resume;
