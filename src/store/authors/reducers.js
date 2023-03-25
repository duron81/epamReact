const authorsInitialState = {
	authors: [],
};

const authorReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case 'AUTHORS_FETCHED':
			return {
				...state,
				authors: action.payload,
			};
		case 'AUTHORS_CREATED':
			return {
				...state,
				authors: [...state.authors, action.payload],
			};
		default:
			return state;
	}
};

export default authorReducer;
