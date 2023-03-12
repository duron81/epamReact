import '../src/App.css';
import CourseCard from './components/Courses/components/CourseCard/CourseCard';
import Header from './components/Header/Header';

function App() {
	// return <Logo />;

	return (
		<div className='app'>
			<Header />
			<CourseCard />
		</div>
	);
}
export default App;
