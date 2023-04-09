const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

function userReducer(state = userInitialState, action) {
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				role: action.payload.role,
			};
		case 'USER_LOGOUT':
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		case 'SET_ADMIN_ROLE':
			return {
				...state,
				role: 'admin',
				name: 'Admin',
			};
		default:
			return state;
	}
}

export default userReducer;
