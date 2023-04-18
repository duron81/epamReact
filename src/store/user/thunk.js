import { userLogIn } from './actionCreators';
import { userLogOut } from './actionCreators';
import { setAdminRole } from './actionCreators';

export const logOutUser = (token) => async (dispatch) => {
	// console.log(token);
	try {
		await fetch(`http://localhost:4000/logout`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		dispatch(userLogOut());
	} catch (error) {
		new Error(error);
	}
	// fetch(`http://localhost:4000/logout`, {
	// 	method: 'DELETE',
	// 	headers: {
	// 		Authorization: token,
	// 	},
	// })
	// 	.then(() => {
	// 		// console.log(result);
	// 		dispatch(userLogOut());
	// 	})
	// 	.catch((error) => new Error(error));
};

export const getUserRole = (userToken) => (dispatch) => {
	fetch('http://localhost:4000/users/me', {
		headers: {
			Authorization: userToken,
		},
	})
		.then((result) => {
			const data = result.json();
			if (data.result.role === 'admin') {
				let temp = JSON.parse(localStorage.getItem('token'));
				temp.user.role = 'admin';
				temp.user.name = 'Admin';
				localStorage.removeItem('token');
				localStorage.setItem('token', JSON.stringify(temp));
				dispatch(setAdminRole());
			}
		})
		.catch((error) => new Error(error));
};
