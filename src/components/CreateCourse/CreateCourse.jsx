import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import MyButton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';
import { authorsCreated } from '../../store/authors/actionCreators';
import { coursesCreated } from '../../store/courses/actionCreators';

import './CreateCourse.css';

function CreateCourse() {

	const dispatch = useDispatch();
	const authorsFromStore = useSelector((state) => state.authorReducer.authors);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [duration, setDuration] = useState('');
	const [authorsList, setAuthorsList] = useState(authorsFromStore);
	const [courseAuthorList, setCourseAuthorList] = useState([]);
	const history = useHistory();

	function renderAuthorsList(authorsList) {
		const items = authorsList.map((author) => {
			let { name, id } = author;
			return (
				<div key={id} className='authorItem'>
					<p>{name}</p>
					<MyButton
						buttonText='Add author'
						onClick={() => addCourseAuthor(author)}
					/>
				</div>
			);
		});
		return items;
	}

	function renderCourseAuthorsList(authorsList) {
		const items = authorsList.map((author) => {
			let { name, id } = author;
			return (
				<div key={id} className='authorItem'>
					<p>{name}</p>
					<MyButton
						buttonText='Delete author'
						onClick={() => deleteCourseAuthor(author)}
					/>
				</div>
			);
		});
		return items;
	}

	function addCourseAuthor(author) {
		setCourseAuthorList([...courseAuthorList, author]);
		setAuthorsList((current) =>
			current.filter((item) => item.name !== author.name)
		);
	}

	function deleteCourseAuthor(author) {
		setAuthorsList([...authorsList, author]);
		setCourseAuthorList((current) =>
			current.filter((item) => item.name !== author.name)
		);
	}

	function createNewAuthor(author) {
		if (author.length < 2) {
			return;
		}
		const newAuthor = {
			id: uuidv4(),
			name: author,
		};
		setAuthorsList([...authorsList, newAuthor]);
		dispatch(authorsCreated(newAuthor));
	}

	function validation() {
		if (
			title === '' ||
			description === '' ||
			duration === '' ||
			isNaN(duration) ||
			courseAuthorList.length === 0
		) {
			return false;
		} else return true;
	}

	function CreateCourse() {
		if (!validation()) {
			alert('Please, fill in all fields');
		} else {
			const newCourse = {
				id: uuidv4(),
				title: title,
				description: description,
				creationDate: dateGenerator(),
				duration: duration,
				authors: courseAuthorList.map((course) => course.id),
			};
			dispatch(coursesCreated(newCourse));
			history.push('/courses');
		}
	}

	return (
		<section className='create'>
			<div className='createTitleBlock'>
				<div className='inputTitle'>
					<label htmlFor='createTitleInput'>Title</label>
					<Input
						name='createTitleInput'
						type='text'
						placeholderText='Enter title...'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<MyButton onClick={CreateCourse} buttonText='Create Course' />
			</div>
			<div className='createDescriptionBlock'>
				<label htmlFor='createDescr'>Description</label>
				<textarea
					name='createDescr'
					type='text'
					placeholder='Enter description'
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className='createAuthorBlock'>
				<div className='leftBlock'>
					<div className='addAuthor'>
						<h3>Add author</h3>
						<label htmlFor='addAuthorName'>Author name</label>
						<Input
							name='addAuthorName'
							type='text'
							placeholderText='Enter author name ...'
							onChange={(e) => setNewAuthor(e.target.value)}
						/>
						<MyButton
							buttonText='Create author'
							onClick={() => createNewAuthor(newAuthor)}
						/>
					</div>
					<div className='addDuration'>
						<h3>Duration</h3>
						<label htmlFor='addDuration'>Duration</label>
						<Input
							name='addDuration'
							type='text'
							placeholderText='Enter duration in minutes ...'
							onChange={(e) => setDuration(e.target.value)}
						/>
						<h2>Duration: {pipeDuration(duration)} hours</h2>
					</div>
				</div>
				<div className='rightBlock'>
					<div className='allAuthorsList'>
						<h3>Authors</h3>
						<div>{renderAuthorsList(authorsList)}</div>
					</div>
					<div className='chosenAuthorsList'>
						<h3>Course authors</h3>
						{courseAuthorList.length === 0 ? (
							<h4>Author list is empty</h4>
						) : (
							renderCourseAuthorsList(courseAuthorList)
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default CreateCourse;
