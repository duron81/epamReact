export function registerUser(user) {
	const res = fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((result) => result.json());
	console.log(res);
	return res;
}

export function loginUser(user) {
	const res = fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((result) => result.json());
	// console.log('in login response is ' + res);
	return res;
}

export function getUserRole(userToken) {
	const res = fetch('http://localhost:4000/users/me', {
		headers: {
			Authorization: userToken,
		},
	}).then((result) => {
		// console.log(result);
		return result.json();
	});
	return res;
}

export function addNewAuthor(newAuthor, token) {
	const response = fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify({ name: newAuthor }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	}).then((result) => result.json());

	// console.log('response is ' + response);
	return response;
}

export function addNewCourse(newCourse, token) {
	// console.log(newCourse);
	const response = fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(newCourse),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	}).then((result) => result.json());

	return response;
}
