export function isValidNewCourse(
	title,
	description,
	duration,
	courseAuthorList
) {
	if (
		title === '' ||
		description === '' ||
		duration === '' ||
		isNaN(duration) ||
		courseAuthorList.length === 0
	) {
		return false;
	} else return true;
}

export function IsValidRegistration(
	registrationName,
	registrationEmail,
	registrationPassword
) {
	if (
		registrationName === '' ||
		registrationEmail === '' ||
		registrationPassword === ''
	) {
		return false;
	} else return true;
}

export function isValdLogin(userEmail, userPassword) {
	if (userEmail === '' || userPassword === '') {
		return false;
	} else return true;
}
