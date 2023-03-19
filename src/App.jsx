import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourse/CreateCourse';

import { useState, useEffect } from 'react';

import '../src/App.css';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import dataContext from './helpers/context';

const { Provider } = dataContext;

function App() {
	// return <Logo />;
	const [userName, setUserName] = useState('');
	const ifLogged = localStorage.getItem('token') != null;

	// console.log(localStorage.getItem('token'));

	useEffect(() => {
		const item = JSON.parse(localStorage.getItem('token'));
		if (item) {
			setUserName(item.user.name);
		}
	}, []);

	function receiveUserName(name) {
		// console.log(name);
		setUserName(name);
		// console.log(userName);
	}

	return (
		<Router>
			<div className='app'>
				<Provider value={userName}>
					<Header receiveUserName={receiveUserName} />
				</Provider>
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
						<Login receiveUserName={receiveUserName} />
					</Route>
					<Route exact path='/courses'>
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
