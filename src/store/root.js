import { combineReducers } from 'redux';
import articles from '../containers/ContentPage/reducers';
import resume from '../containers/ResumePage/reducers';

export default combineReducers({
  articles,
  resume,
});
