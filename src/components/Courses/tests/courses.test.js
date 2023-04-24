import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Courses from '../Courses';
import CourseCard from '../components/CourseCard/CourseCard';
import { BrowserRouter } from 'react-router-dom';
import { mockedStore } from '../../../helpers/mockedStore';

it('should display amount of CourseCard equal length of courses array', () => {
	const { container } = render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);

	expect(container.getElementsByClassName('card').length).toEqual(
		mockedStore.getState().coursesReducer.courses.length
	);
});

it('should display Empty container if courses array length is 0.', () => {
	const mockedStateWithoutCourses = {
		userReducer: {
			isAuth: true,
			name: 'Test Name',
			token: {
				result: 'ok',
			},
		},
		coursesReducer: {
			courses: [],
		},
		authorReducer: {
			authors: [
				{
					id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
					name: 'Vasiliy Dobkin',
				},
				{
					id: 'f762978b-61eb-4096-812b-ebde22838167',
					name: 'Nicolas Kim',
				},
				{
					id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
					name: 'Anna Sidorenko',
				},
				{
					id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
					name: 'Valentina Larina',
				},
			],
		},
	};

	const mockedStoreWithoutCourses = {
		getState: () => mockedStateWithoutCourses,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	const { container } = render(
		<Provider store={mockedStoreWithoutCourses}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);

	expect(container.getElementsByClassName('card').length).toEqual(0);
});

it('CourseForm should be showed after a click on a button "Add new course"', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByText('Add new course')).toBeInTheDocument();
	fireEvent.click(screen.getByText('Add new course'));
	expect(window.location.pathname).toEqual('/courses/add');
});
