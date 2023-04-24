import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import CourseCard from '../CourseCard';
import Courses from '../../../Courses';
import { BrowserRouter } from 'react-router-dom';
import { mockedStore } from '../../../../../helpers/mockedStore';

it('should display title', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText('Angular')).toBeInTheDocument();
});

it('should display description', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText('some descr')).toBeInTheDocument();
});

it('should display authors list', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText('Vasiliy Dobkin')).toBeInTheDocument();
});

it('should display creation data in correct format', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText(/\d:\d:\d\d\d\d/)).toBeInTheDocument();
});

it('should display duration in correct format', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses>
					<CourseCard />
				</Courses>
			</BrowserRouter>
		</Provider>
	);

	expect(screen.queryByText(/03:30 hours/)).toBeInTheDocument();
});
