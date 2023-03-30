const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
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
			};
		case 'USER_LOGOUT':
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
}

export default userReducer;
