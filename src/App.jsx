import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogIn } from './store/user/actionCreators';

import '../src/App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
	const dispatch = useDispatch();
	const ifLogged = localStorage.getItem('token') != null;

	useEffect(() => {
		const item = JSON.parse(localStorage.getItem('token'));
		if (item) {
			const user = {
				token: item,
				name: item.user.name,
				email: item.user.email,
			};
			dispatch(userLogIn(user));
		}
	}, []);

	return (
		<Router>
			<div className='app'>
				<Header />
				<Switch>
					<Route
						exact
						path='/'
						render={() =>
							ifLogged ? <Redirect to='/courses' /> : <Redirect to='/login' />
						}
					/>
					<Route exact path='/registration'>
						<Registration />
					</Route>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/courses/add'>
						<CreateCourse />
					</Route>
					<Route exact path='/courses'>
						<Courses />
					</Route>
					<Route exact path='/courses/:courseId'>
						<CourseInfo />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
export default App;
