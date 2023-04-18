const coursesInitialState = {
	courses: [],
};

function coursesReducer(state = coursesInitialState, action) {
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
		case 'COURSES_DELETED':
			return {
				...state,
				courses: state.courses.filter((item) => item.id !== action.payload),
			};
		case 'COURSES_UPDATED':
			return {
				...state,
				courses: state.courses.map((item) => {
					// console.log(item.id);
					if (item.id === action.payload.id) {
						item = action.payload;
					}
					return item;
				}),
			};
		default:
			return state;
	}
}

export default coursesReducer;
