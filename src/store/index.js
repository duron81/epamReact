import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import userReducer from './user/reducer';
import authorReducer from './authors/reducers';
import coursesReducer from './courses/reducer';

const store = createStore(
	combineReducers({ userReducer, authorReducer, coursesReducer }),
	compose(
		applyMiddleware(ReduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
