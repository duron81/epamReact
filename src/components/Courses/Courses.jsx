import { useState } from 'react';
import { Link } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import MyButton from '../../common/Button/Button';
import { mockedCoursesList } from '../../constants';
import { mockedAuthorsList } from '../../constants';

import './Courses.css';

const Courses = () => {
	const [courses, setCourses] = useState(mockedCoursesList);
	// const [search, setSearch] = useState('');

	const searchMessage = (message) => {
		// console.log('message = ' + message);

		if (!message) {
			return setCourses(mockedCoursesList);
		}

		let arr = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(message.toLowerCase()) ||
				course.id.toLowerCase().includes(message.toLowerCase())
		);
		setCourses(arr);
	};

	// mockedCoursesList.forEach((course) => console.log(course));

	function renderItems(arr) {
		const items = arr.map((item) => {
			let { title, description, creationDate, duration, authors } = item;

			let result = [];
			authors.forEach((authorId) => {
				mockedAuthorsList.map((author) => {
					if (author.id === authorId) {
						result.push(author.name);
					}
					return result;
				});
			});

			return (
				<CourseCard
					title={title}
					description={description}
					creationDate={creationDate.replaceAll('/', ':')}
					duration={duration}
					authors={result}
				/>
			);
		});
		return items;
	}

	return (
		<div className='courses'>
			<div className='searchPanel'>
				<SearchBar searchMessage={searchMessage} />
				<Link to='/newcourse'>
					<MyButton buttonText='Add new course' />
				</Link>
			</div>
			{renderItems(courses)}
		</div>
	);
};

export default Courses;
