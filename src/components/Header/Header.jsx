import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';
import dataContext from '../../helpers/context';

import '../Header/Header.css';

function Header({ receiveUserName }) {
	const context = useContext(dataContext);
	const history = useHistory();

	function onLogout() {
		receiveUserName('');
		localStorage.removeItem('token');
		history.push('/login');
	}

	const result = context ? (
		<MyButton
			className='headerButton'
			buttonText='Log out'
			onClick={onLogout}
		/>
	) : null;

	return (
		<div className='header'>
			<Logo />
			<h2>{context}</h2>
			{result}
		</div>
	);
}

export default Header;
