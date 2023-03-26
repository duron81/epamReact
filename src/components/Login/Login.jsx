import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MyButton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { userLogIn } from '../../store/user/actionCreators';
import './Login.css';

function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	function validation() {
		if (userEmail === '' || userPassword === '') {
			return false;
		} else return true;
	}

	async function OpenCourses(e) {
		e.preventDefault();
		if (!validation()) {
			alert('Please, fill in all fields');
		} else {
			const user = {
				email: userEmail,
				password: userPassword,
			};

			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (result.successful) {
				localStorage.setItem('token', JSON.stringify(result));
				user.token = result;
				user.name = result.user.name;
				history.push('/courses');
				dispatch(userLogIn(user));
			}
		}
	}

	return (
		<>
			<form className='loginBlock' onSubmit={OpenCourses}>
				<h3>Login</h3>
				<div className='loginInputBlock'>
					<label htmlFor='loginEmailInput'>Email</label>
					<Input
						name='loginEmailInput'
						placeholderText='Enter email'
						onChange={(e) => setUserEmail(e.target.value)}
					/>
				</div>
				<div className='loginInputBlock'>
					<label htmlFor='loginPassowrdInput'>Password</label>
					<Input
						name='loginPassowrdInput'
						placeholderText='Enter password'
						onChange={(e) => setUserPassword(e.target.value)}
					/>
				</div>

				<MyButton type='submit' buttonText='Login' />
				<h4>
					If you not have an account you can{' '}
					<Link to='/registration'>Registration</Link>
				</h4>
			</form>
		</>
	);
}

export default Login;
