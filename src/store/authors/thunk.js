import { authorsFetched } from './actionCreators';

export const fetchAllAuthors = () => (dispatch) => {
	fetch('http://localhost:4000/authors/all').then((result) =>
		result.json().then((data) => dispatch(authorsFetched(data.result)))
	);
};
