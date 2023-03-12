import '../src/App.css';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';

function App() {
	// return <Logo />;

	return (
		<div className='app'>
			<Header />
			<Courses />
		</div>
	);
}
export default App;
