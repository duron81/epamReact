import './Input.css';

function Input(props) {
	return (
		<>
			<input
				id='searchBarInput'
				type='text'
				placeholder={props.placeholderText}
				onChange={props.onChange}
				value={props.value}
			/>
			<label htmlFor='searchBarInput'></label>
		</>
	);
}

export default Input;
