import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRouter({ component: Component, ...rest }) {
	const userTokenFromStore = useSelector((state) => state.userReducer.role);
	return (
		<Route
			{...rest}
			render={(props) =>
				userTokenFromStore === 'admin' ? (
					// console.log(localStorage.getItem('token'));
					<Component {...rest} />
				) : (
					<Redirect
						to={{
							pathname: '/courses',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRouter;
