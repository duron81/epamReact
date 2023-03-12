import Input from './components/Input';
import MyButton from '../../../../common/Button/Button';

const SearchBar = () => {
	return (
		<div className='searchBar'>
			<Input placeholdetText='Enter course name...' />
			<MyButton buttonText='Search' />
		</div>
	);
};

export default SearchBar;
