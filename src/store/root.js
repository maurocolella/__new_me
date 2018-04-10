import { combineReducers } from 'redux';
import { articles, articlesHasErrored, articlesIsLoading } from '../containers/ContentPage/reducers';
import { skills, skillsHasErrored, skillsIsLoading } from '../containers/SkillsPage/reducers';

export default combineReducers({
  articles,
  articlesHasErrored,
  articlesIsLoading,
  skills,
  skillsHasErrored,
  skillsIsLoading,
});
