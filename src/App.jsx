import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourse/CreateCourse';

import '../src/App.css';

function App() {
	// return <Logo />;

	return (
		<Router>
			<div className='app'>
				<Header />
				<Switch>
					<Route exact path='/'>
						<Courses />
					</Route>
					<Route exact path='/newcourse'>
						<CreateCourse />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
export default App;
