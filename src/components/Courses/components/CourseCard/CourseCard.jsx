import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MyButton from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { deleteCourse } from '../../../../store/courses/thunk';

import './CourseCard.css';

function CourseCard({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
}) {
	const dispatch = useDispatch();
	const userTokenFromStore = useSelector((state) => state.userReducer);

	const ifVisible =
		userTokenFromStore.role === 'admin'
			? { display: 'block' }
			: { display: 'none' };

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
					<div className='cardButtonInfo'>
						<Link to={`/courses/${id}`}>
							<MyButton buttonText='Show course'></MyButton>
						</Link>
					</div>
					<div className='cardButtonUpdate' style={ifVisible}>
						<Link to={`/courses/update/${id}`}>
							<MyButton />
						</Link>
					</div>
					<div className='cardButtonDelete' style={ifVisible}>
						<MyButton
							onClick={() =>
								dispatch(deleteCourse(id, userTokenFromStore.token.result))
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
