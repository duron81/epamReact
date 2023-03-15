export function pipeDuration(duration) {
	if (isNaN(duration)) {
		return;
	}

	let result = '';
	let hours = Math.floor(+duration / 60);
	let minutes = +duration % 60;

	if (hours < 10) {
		result += `0${hours}:`;
	} else {
		result += hours + ':';
	}

	if (minutes < 10) {
		result += `0${minutes}`;
	} else {
		result += minutes;
	}

	return result;
}
