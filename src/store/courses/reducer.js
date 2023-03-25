const coursesInitialState = {
	courses: [],
};

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case 'COURSES_FETCHED':
			return {
				...state,
				courses: action.payload,
			};
		case 'COURSES_CREATED':
			return {
				...state,
				courses: [...state.courses, action.payload],
			};
		default:
			return state;
	}
};

export default coursesReducer;
