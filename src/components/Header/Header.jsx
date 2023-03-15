import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';

import '../Header/Header.css';

const Header = () => {
	return (
		<div className='header'>
			<Logo />
			<h2>Andriy</h2>
			<MyButton className='headerButton' buttonText='Log out' />
		</div>
	);
};

export default Header;
