import './Input.css';

const Input = (props) => {
	return (
		<>
			<input
				id='searchBarInput'
				type='text'
				placeholder={props.placeholdetText}
				onChange={props.onChange}
			/>
			<label htmlFor='searchBarInput'></label>
		</>
	);
};

export default Input;
