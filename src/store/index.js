import { createStore, combineReducers } from 'redux';
import userReducer from './user/reducer';
import authorReducer from './authors/reducers';
import coursesReducer from './courses/reducer';

const store = createStore(
	combineReducers({ userReducer, authorReducer, coursesReducer }),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
