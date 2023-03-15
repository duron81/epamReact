import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import MyButton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { mockedAuthorsList } from '../../constants';
import { mockedCoursesList } from '../../constants';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';

import './CreateCourse.css';

const CreateCourse = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [duration, setDuration] = useState('');
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [courseAuthorList, setCourseAuthorList] = useState([]);
	const history = useHistory();

	function renderAuthorsList(authorsList) {
		const items = authorsList.map((author) => {
			let { name } = author;
			return (
				<div className='authorItem'>
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
			let { name } = author;
			return (
				<div className='authorItem'>
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
		mockedAuthorsList.push(newAuthor);
	}

	const checked =
		courseAuthorList.length === 0 ? (
			<h4>Author list is empty</h4>
		) : (
			renderCourseAuthorsList(courseAuthorList)
		);

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
			mockedCoursesList.push(newCourse);
			history.push('/');
		}
	}

	return (
		<section className='create'>
			<div className='createTitleBlock'>
				<div className='inputTitle'>
					<label for='createTitleInput'>Title</label>
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
				<label for='createDescr'>Description</label>
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
						<label for='addAuthorName'>Author name</label>
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
						<label for='addDuration'>Duration</label>
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
						{checked}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateCourse;
