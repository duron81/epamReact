export async function getAllCoursesFromAPI() {
	const res = fetch('http://localhost:4000/courses/all').then((result) =>
		result.json()
	);
	return res;
}

export async function getAllAuthorsFromAPI() {
	const res = fetch('http://localhost:4000/authors/all').then((result) =>
		result.json()
	);
	return res;
}

export function registerUser(user) {
	const res = fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((result) => result.json());
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
	return res;
}
