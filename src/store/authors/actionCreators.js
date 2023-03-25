export const authorsFetched = (author) => {
	return {
		type: 'AUTHORS_FETCHED',
		payload: author,
	};
};

export const authorsCreated = (author) => {
	return {
		type: 'AUTHORS_CREATED',
		payload: author,
	};
};
