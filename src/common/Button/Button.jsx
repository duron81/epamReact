import './Button.css';

function MyButton(props) {
	return (
		<button className='button' onClick={props.onClick}>
			{props.buttonText}
		</button>
	);
}

export default MyButton;
