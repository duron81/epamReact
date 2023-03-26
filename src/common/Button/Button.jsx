import './Button.css';

const MyButton = (props) => {
	return (
		<button className='button' onClick={props.onClick}>
			{props.buttonText}
			{/* <img alt={props.imgAlt} src={props.imgSrc} /> */}
		</button>
	);
};

export default MyButton;
