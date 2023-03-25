import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import MyButton from '../../common/Button/Button';
import { mockedCoursesList } from '../../constants';
import { mockedAuthorsList } from '../../constants';
import { coursesFetched } from '../../store/courses/actionCreators';
import { authorsFetched } from '../../store/authors/actionCreators';

import './Courses.css';

const Courses = () => {
	const dispatch = useDispatch();
	const courses2 = useSelector((state) => state.coursesReducer.courses);
	const authorsFromStore = useSelector((state) => state.authorReducer.authors);

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (courses2.length === 0) {
			fetch('http://localhost:4000/courses/all')
				.then((response) => response.json())
				.then((data) => {
					dispatch(coursesFetched(data.result));
				});
		}
		if (authorsFromStore.length === 0) {
			fetch('http://localhost:4000/authors/all')
				.then((response) => response.json())
				.then((data) => {
					dispatch(authorsFetched(data.result));
				});
		}
	}, []);

	function filteredCourses() {
		if (message === '') {
			return renderItems(courses2);
		} else {
			const result = courses2.filter(
				(course) =>
					course.title.toLowerCase().includes(message.toLowerCase()) ||
					course.id.toLowerCase().includes(message.toLowerCase())
			);
			return renderItems(result);
		}
	}

	// console.log(courses2);

	const searchMessage = (message) => {
		setMessage(message);
	};

	function renderItems(arr) {
		const items = arr.map((item) => {
			let { id, title, description, creationDate, duration, authors } = item;

			let result = [];
			authors.forEach((authorId) => {
				authorsFromStore.map((author) => {
					if (author.id === authorId) {
						result.push(author.name);
					}
					return result;
				});
			});

			return (
				<CourseCard
					key={id}
					id={id}
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
				<Link to='/courses/add'>
					<MyButton buttonText='Add new course' />
				</Link>
			</div>
			{filteredCourses()}
		</div>
	);
};

export default Courses;
