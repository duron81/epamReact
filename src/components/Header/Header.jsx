import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';
import { userLogOut } from '../../store/user/actionCreators';

import '../Header/Header.css';

function Header({ receiveUserName }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userNameFromStore = useSelector((state) => state.userReducer.name);

	function onLogout() {
		localStorage.removeItem('token');
		dispatch(userLogOut());
		history.push('/login');
	}

	const result = userNameFromStore ? (
		<MyButton
			className='headerButton'
			buttonText='Log out'
			onClick={onLogout}
		/>
	) : null;

	return (
		<div className='header'>
			<Logo />
			<h2>{userNameFromStore}</h2>
			{result}
		</div>
	);
}

export default Header;
