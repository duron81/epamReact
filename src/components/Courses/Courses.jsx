import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import MyButton from '../../common/Button/Button';
import { fetchAllCourses } from '../../store/courses/thunk';
import { fetchAllAuthors } from '../../store/authors/thunk';
import { setAdminRole } from '../../store/user/actionCreators';
import { getUserRole } from '../../services';

import './Courses.css';

function Courses() {
	const dispatch = useDispatch();
	const coursesFromStore = useSelector((state) => state.coursesReducer.courses);
	const authorsFromStore = useSelector((state) => state.authorReducer.authors);
	const userTokenFromStore = useSelector((state) => state.userReducer);

	const [message, setMessage] = useState('');

	function filteredCourses() {
		if (message === '') {
			return renderItems(coursesFromStore);
		} else {
			const result = coursesFromStore.filter(
				(course) =>
					course.title.toLowerCase().includes(message.toLowerCase()) ||
					course.id.toLowerCase().includes(message.toLowerCase())
			);
			return renderItems(result);
		}
	}

	function renderItems(arr) {
		const items = arr.map((item) => {
			let { id, title, description, creationDate, duration, authors } = item;
			creationDate = creationDate.replaceAll('/', ':');

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
					data-testid='courseCardTest'
					key={id}
					id={id}
					title={title}
					description={description}
					creationDate={creationDate}
					duration={duration}
					authors={result}
				/>
			);
		});
		return items;
	}

	//прокидываю пропсы из нижнего компонента SearchBar в верхний через функцию searchMessage
	function searchMessage(message) {
		setMessage(message);
	}

	useEffect(() => {
		if (coursesFromStore.length === 0) {
			dispatch(fetchAllCourses());
		}
		if (authorsFromStore.length === 0) {
			dispatch(fetchAllAuthors());
		}
		getUserRole(userTokenFromStore.token.result).then((data) => {
			if (data.result.role === 'admin') {
				let temp = JSON.parse(localStorage.getItem('token'));
				temp.user.role = 'admin';
				temp.user.name = 'Admin';
				localStorage.removeItem('token');
				localStorage.setItem('token', JSON.stringify(temp));
				dispatch(setAdminRole());
			}
		});
	}, []);

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
}

export default Courses;
