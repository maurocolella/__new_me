const initialState = {
  hasErrored: false,
  isLoading: false,
  items: [],
};

function works(state = initialState, action) {
  switch (action.type) {
    case 'WORKS_HAS_ERRORED':
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
      };
    case 'WORKS_IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'WORKS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        items: action.payload.slice(),
      };
    default:
      return state;
  }
}

export default works;
