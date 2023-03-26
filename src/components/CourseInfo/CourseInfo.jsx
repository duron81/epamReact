import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import MyButton from '../../common/Button/Button';
import { pipeDuration } from '../../helpers/pipeDuration';
import './CourseInfo.css';

const CourseInfo = () => {
	const { courseId } = useParams();

	const coursesFromStore = useSelector((state) => state.coursesReducer.courses);
	const authorsFromStore = useSelector((state) => state.authorReducer.authors);

	const singleCourse = coursesFromStore.filter((item) => item.id === courseId);

	const [course, setCourse] = useState(singleCourse[0]);

	function renderAuthors(authors) {
		const items = authors.map((item) => {
			const authorNamesArr = authorsFromStore;
			const filterResult = authorNamesArr.filter((i) => i.id === item);
			if (filterResult.length === 0) {
				return false;
			} else {
				return <li key={filterResult[0].id}> {filterResult[0].name}</li>;
			}
		});
		return items;
	}

	return (
		<div className='courseInfoBlock'>
			<Link to='/courses'>
				<MyButton buttonText='< Back to courses' />
			</Link>
			<h2>{course.title}</h2>
			<div className='courseInfoGridBlock'>
				<div className='courseInfoGridBlockLeft'>
					<p>{course.description}</p>
				</div>
				<div className='courseInfoGridBlockRight'>
					<p>
						<strong>ID: </strong>
						{course.id}
					</p>
					<p>
						<strong>Duration: </strong>
						{pipeDuration(course.duration)} hours
					</p>
					<p>
						<strong>Created: </strong>
						{course.creationDate.replaceAll('/', ':')}
					</p>
					<p>
						<strong>Authors: </strong>
					</p>
					<ul>{renderAuthors(course.authors)}</ul>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
