import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { mockedStore } from '../../helpers/mockedStore';
import coursesReducer from '../courses/reducer';

it('should return the initial state.', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);

	const initialState = {
		courses: [],
	};

	expect(coursesReducer(undefined, {})).toEqual(initialState);
});
