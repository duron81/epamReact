import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';
// import { userLogOut } from '../../store/user/actionCreators';
import { logOutUser } from '../../store/user/thunk';

import '../Header/Header.css';

function Header({ receiveUserName }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userNameFromStore = useSelector((state) => state.userReducer.name);
	// console.log('here');
	// const userNameFromStore = 'john';
	const userTokenFromStore = useSelector(
		(state) => state.userReducer.token.result
	);
	// const userTokenFromStore = 'token';

	function onLogout() {
		dispatch(logOutUser(userTokenFromStore));
		localStorage.removeItem('token');
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
			<Logo data-testid={'logoTest'} />
			<h2>{userNameFromStore}</h2>
			{result}
		</div>
	);
}

export default Header;
