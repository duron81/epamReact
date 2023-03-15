import { useState } from 'react';

import Input from '../../../../common/Input/Input';
import MyButton from '../../../../common/Button/Button';

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
			<Input onChange={searchChanged} placeholderText='Enter course name...' />
			<MyButton onClick={searchClicked} buttonText='Search' />
		</div>
	);
};

export default SearchBar;
