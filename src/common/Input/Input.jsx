import './Input.css';

function Input(props) {
	return (
		<>
			<input
				id='searchBarInput'
				type='text'
				placeholder={props.placeholderText}
				onChange={props.onChange}
			/>
			<label htmlFor='searchBarInput'></label>
		</>
	);
}

export default Input;
