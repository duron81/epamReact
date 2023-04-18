import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import MyButton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { registerUser } from '../../services';
import { IsValidRegistration } from '../../utils';

import './Registration.css';

function Registration() {
	const [registrationName, setRegistrationName] = useState('');
	const [registrationEmail, setRegistrationEmail] = useState('');
	const [registrationPassword, setRegistrationPassword] = useState('');
	const history = useHistory();

	function CreateNewLogin(e) {
		e.preventDefault();
		if (
			!IsValidRegistration(
				registrationName,
				registrationEmail,
				registrationPassword
			)
		) {
			alert('Please, fill in all fields');
		} else {
			const newUser = {
				name: registrationName,
				email: registrationEmail,
				password: registrationPassword,
			};

			registerUser(newUser).then((result) => {
				if (result.successful) {
					history.push('/login');
				}
			});
		}
	}

	return (
		<>
			<form className='registrationBlock' onSubmit={CreateNewLogin}>
				<h3>Registration</h3>
				<div className='registrationInputBlock'>
					<label htmlFor='registrationNameInput'>Name</label>
					<Input
						name='registrationNameInput'
						placeholderText='Enter name'
						onChange={(e) => setRegistrationName(e.target.value)}
					/>
				</div>
				<div className='registrationInputBlock'>
					<label htmlFor='registrationEmailInput'>Email</label>
					<Input
						name='registrationEmailInput'
						placeholderText='Enter email'
						onChange={(e) => setRegistrationEmail(e.target.value)}
					/>
				</div>
				<div className='registrationInputBlock'>
					<label htmlFor='registrationPasswordInput'>Password</label>
					<Input
						name='registrationPasswordInput'
						placeholderText='Enter password'
						onChange={(e) => setRegistrationPassword(e.target.value)}
					/>
				</div>

				<MyButton type='submit' buttonText='Registration' />
				<h4>
					If you have an account you can <Link to='/login'>Login</Link>
				</h4>
			</form>
		</>
	);
}

export default Registration;
