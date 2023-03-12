import './Courses.css';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import MyButton from '../../common/Button/Button';

const Courses = () => {
	return (
		<div className='courses'>
			<div className='searchPanel'>
				<SearchBar />
				<MyButton buttonText='Add new course' />
			</div>
			<CourseCard />
			<CourseCard />
		</div>
	);
};

export default Courses;
