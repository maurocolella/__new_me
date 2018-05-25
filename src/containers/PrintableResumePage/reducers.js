const initialState = {
  hasErrored: false,
  isLoading: false,
  item: {},
};

function profile(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_HAS_ERRORED':
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
      };
    case 'PROFILE_IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'PROFILE_FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        item: action.payload,
      };
    default:
      return state;
  }
}

export default profile;
