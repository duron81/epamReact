import {
	coursesFetched,
	coursesDeleted,
	coursesUpdated,
} from './actionCreators';

export const fetchAllCourses = () => (dispatch) => {
	fetch('http://localhost:4000/courses/all').then((result) =>
		result.json().then((data) => dispatch(coursesFetched(data.result)))
	);
};

export const deleteCourse = (id, token) => (dispatch) => {
	fetch(`http://localhost:4000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	})
		.then((result) => result.json())
		.then((data) => {
			// console.log(data);
			if (data.successful) {
				dispatch(coursesDeleted(id));
			}
		})
		.catch((error) => new Error(error));
};

export const updateCourse = (id, course, token) => (dispatch) => {
	fetch(`http://localhost:4000/courses/${id}`, {
		method: 'PUT',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	})
		.then((result) => result.json())
		.then((data) => {
			if (data.successful) {
				course.id = id;
				course.creationDate = data.result.creationDate;
				dispatch(coursesUpdated(course));
			}
		})
		.catch((error) => new Error(error));
};
