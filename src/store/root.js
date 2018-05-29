import { combineReducers } from 'redux';
// import mergeWith from 'lodash/mergeWith';
import articles from '../containers/ContentPage/reducers';
import skills from '../containers/SkillsPage/reducers';
import resume from '../containers/ResumePage/reducers';
import profile from '../containers/PrintableResumePage/reducers';
import works from '../containers/WorkPage/reducers';

/* TODO: implement
const initialState = {
  entities: {
    articles: {},
    skills: {},
  },
};

function entities(state = initialState.entities, action) {
  if (action.payload && action.payload.entities) {
    // Don't merge arrays but overwrite them
    // Added for widgets
    return mergeWith(
      {},
      state,
      action.payload.entities,
      (objValue, srcValue) => {
        if (srcValue && srcValue.constructor === Array) {
          return srcValue;
        }
        return undefined;
      },
    );
  }

  return state;
} */

export default combineReducers({
  articles,
  skills,
  resume,
  profile,
  works,
  // entities,
});
