export function dateGenerator() {
	const current = new Date();

	let date = current.getDate();
	let month = current.getMonth() + 1;
	let year = current.getFullYear();

	date = date.toString().padStart(2, '0');

	month = month.toString().padStart(2, '0');

	return `${date}/${month}/${year}`;
}
