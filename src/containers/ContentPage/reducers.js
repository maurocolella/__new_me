const initialState = {
  hasErrored: false,
  isLoading: false,
  items: [],
};

function articles(state = initialState, action) {
  switch (action.type) {
    case 'ARTICLES_HAS_ERRORED':
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
      };
    case 'ARTICLES_IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'ARTICLES_FETCH_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        items: action.payload.slice(),
      };
    default:
      return state;
  }
}

export default articles;
