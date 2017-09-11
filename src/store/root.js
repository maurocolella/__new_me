import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from '../containers/ContentPage/reducers';

export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading
});
