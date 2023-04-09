export const userLogIn = (user) => {
	return {
		type: 'USER_LOGIN',
		payload: user,
	};
};

export function userLogOut() {
	return {
		type: 'USER_LOGOUT',
	};
}

export function setAdminRole() {
	return {
		type: 'SET_ADMIN_ROLE',
	};
}
