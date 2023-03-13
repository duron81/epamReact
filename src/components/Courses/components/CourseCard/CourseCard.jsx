import MyButton from '../../../../common/Button/Button';
import './CourseCard.css';

const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	authors,
}) => {
	function getHours(duration) {
		let result = '';
		let hours = Math.floor(+duration / 60);
		let minutes = +duration % 60;

		if (hours < 10) {
			result += `0${hours}:`;
		} else {
			result += hours + ':';
		}

		if (minutes < 10) {
			result += `0${minutes}`;
		} else {
			result += minutes;
		}

		return result;
	}

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
					{getHours(duration)} hours
				</p>
				<p className='created'>
					<strong>Created: </strong>
					{creationDate}
				</p>
				<div className='rightButton'>
					<MyButton className='cardButton' buttonText='Show course'></MyButton>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
