import * as React from 'react';
import { getByAltText, render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
// import '@testing-library/jest-dom';
// import renderer from 'react-test-renderer';
// import configureStore from 'redux-mock-store';

import Header from '../Header';
import Logo from '../components/Logo/Logo';
// import App from '../../../App';
// import userReducer from '../../../store/user/reducer';

const mockedState = {
	userReducer: {
		isAuth: true,
		name: 'Test Name',
		token: {
			result: 'ok',
		},
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

it('should be rendered user name', () => {
	render(
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	);
	expect(screen.queryByText('Test Name')).toBeInTheDocument();
});

it('should be rendered logo', () => {
	render(
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	);
	const logo = screen.getByRole('img');
	expect(logo).toHaveAttribute('alt', 'logo');
});
