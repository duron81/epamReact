import './Input.css';

const Input = (props) => {
	return (
		<>
			<input
				id='searchBarInput'
				type='text'
				placeholder={props.placeholdetText}
			/>
			<label htmlFor='searchBarInput'></label>
		</>
	);
};

export default Input;
