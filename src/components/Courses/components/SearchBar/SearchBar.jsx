import Input from '../../../../common/Input/Input';
import MyButton from '../../../../common/Button/Button';
import { useState } from 'react';

const SearchBar = ({ searchMessage }) => {
	const [search, setSearch] = useState('');

	const searchClicked = () => {
		searchMessage(search);
	};

	const searchChanged = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className='searchBar'>
			<Input onChange={searchChanged} placeholdetText='Enter course name...' />
			<MyButton onClick={searchClicked} buttonText='Search' />
		</div>
	);
};

export default SearchBar;
