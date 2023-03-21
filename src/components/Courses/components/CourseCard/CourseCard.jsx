// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MyButton from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';

import './CourseCard.css';

const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
}) => {
	// const history = useHistory();

	// function showCourseInfo() {
	// 	history.push({`/courses/${id}`});
	// }

	return (
		<div className='card'>
			<div className='leftSide'>
				<h2 className='leftTitle'>{title}</h2>
				<p className='leftDescr'>{description}</p>
			</div>
			<div className='rightSide'>
				<p className='authors'>
					<strong>Authors: </strong>
					{authors.join(', ')}
				</p>
				<p className='duration'>
					<strong>Duration: </strong>
					{pipeDuration(duration)} hours
				</p>
				<p className='created'>
					<strong>Created: </strong>
					{creationDate}
				</p>
				<div className='rightButton'>
					<Link to={`/courses/${id}`}>
						<MyButton
							className='cardButton'
							buttonText='Show course'
						></MyButton>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
