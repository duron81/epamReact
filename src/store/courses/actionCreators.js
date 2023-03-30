export function coursesFetched(course) {
	return {
		type: 'COURSES_FETCHED',
		payload: course,
	};
}

export function coursesCreated(course) {
	return {
		type: 'COURSES_CREATED',
		payload: course,
	};
}

export function coursesDeleted(courseId) {
	return {
		type: 'COURSES_DELETED',
		payload: courseId,
	};
}
