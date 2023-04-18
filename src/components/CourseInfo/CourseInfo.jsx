import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MyButton from '../../common/Button/Button';
import { pipeDuration } from '../../helpers/pipeDuration';
import './CourseInfo.css';

function CourseInfo() {
	const { courseId } = useParams();

	const coursesFromStore = useSelector((state) => state.coursesReducer.courses);
	const authorsFromStore = useSelector((state) => state.authorReducer.authors);

	const singleCourse = coursesFromStore.find((item) => item.id === courseId);
	const { title, description, id, duration, creationDate, authors } =
		singleCourse;

	return (
		<div className='courseInfoBlock'>
			<Link to='/courses'>
				<MyButton buttonText='< Back to courses' />
			</Link>
			<h2>{title}</h2>
			<div className='courseInfoGridBlock'>
				<div className='courseInfoGridBlockLeft'>
					<p>{description}</p>
				</div>
				<div className='courseInfoGridBlockRight'>
					<p>
						<strong>ID: </strong>
						{id}
					</p>
					<p>
						<strong>Duration: </strong>
						{pipeDuration(duration)} hours
					</p>
					<p>
						<strong>Created: </strong>
						{creationDate.replaceAll('/', ':')}
					</p>
					<p>
						<strong>Authors: </strong>
					</p>
					<ul>
						{authors.map((item) => {
							const filterResult = authorsFromStore.filter(
								(i) => i.id === item
							);
							if (filterResult.length === 0) {
								return false;
							} else {
								return (
									<li key={filterResult[0].id}> {filterResult[0].name}</li>
								);
							}
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
