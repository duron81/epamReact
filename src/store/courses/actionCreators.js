export const coursesFetched = (course) => {
	return {
		type: 'COURSES_FETCHED',
		payload: course,
	};
};

export const coursesCreated = (course) => {
	return {
		type: 'COURSES_CREATED',
		payload: course,
	};
};

export const coursesDeleted = (course) => {
	return {
		type: 'COURSES_DELETED',
		payload: course,
	};
};
