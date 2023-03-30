export function authorsFetched(author) {
	return {
		type: 'AUTHORS_FETCHED',
		payload: author,
	};
}

export function authorsCreated(author) {
	return {
		type: 'AUTHORS_CREATED',
		payload: author,
	};
}
