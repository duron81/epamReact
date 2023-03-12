import MyButton from '../../../../common/Button/Button';
import './CourseCard.css';

const CourseCard = () => {
	return (
		<div className='card'>
			<div className='leftSide'>
				<h2 className='leftTitle'>Title</h2>
				<p className='leftDescr'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quidem,
					maxime obcaecati corrupti voluptatum et! Corrupti voluptas aut quod,
					voluptates a quam deleniti in dignissimos velit repellat inventore
					assumenda aspernatur praesentium eaque, quas nihil! Maxime sapiente
					quam repellat impedit soluta!
				</p>
			</div>
			<div className='rightSide'>
				<p className='authors'>
					<strong>Authors: </strong>some authors
				</p>
				<p className='duration'>
					<strong>Duration: </strong>08:00 hours
				</p>
				<p className='created'>
					<strong>Created: </strong>some authors
				</p>
				<MyButton buttonText='Show course'></MyButton>
			</div>
		</div>
	);
};

export default CourseCard;
