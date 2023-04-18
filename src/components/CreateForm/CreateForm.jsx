import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MyButton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';
import { authorsCreated } from '../../store/authors/actionCreators';
import { coursesCreated } from '../../store/courses/actionCreators';
import { updateCourse } from '../../store/courses/thunk';
import { isValidNewCourse } from '../../utils';
import { addNewAuthor, addNewCourse } from '../../services';

import './CreateForm.css';

function CreateForm({ desc }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { courseId } = useParams();
	const authorsFromStore = useSelector((state) => state.authorReducer.authors);
	const userTokenFromStore = useSelector((state) => state.userReducer);
	const coursesFromStore = useSelector((state) => state.coursesReducer.courses);
	const currentCourse = coursesFromStore.filter(
		(course) => course.id === courseId
	);

	const [description, setDescription] = useState(
		desc ? currentCourse[0].description : ''
	);
	const [newAuthor, setNewAuthor] = useState('');
	const [duration, setDuration] = useState(
		desc ? currentCourse[0].duration : ''
	);
	const [authorsList, setAuthorsList] = useState(authorsFromStore);
	const [courseAuthorList, setCourseAuthorList] = useState([]);
	const [title, setTitle] = useState(desc ? currentCourse[0].title : '');

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

	async function createNewAuthor(author) {
		if (author.length < 2) {
			return;
		}

		const response = await addNewAuthor(
			author,
			userTokenFromStore.token.result
		);

		if (response.successful) {
			setAuthorsList([
				...authorsList,
				{ id: response.result.id, name: response.result.name },
			]);
			dispatch(
				authorsCreated({ name: response.result.name, id: response.result.id })
			);
		}
	}

	async function CreateCourse() {
		if (!isValidNewCourse(title, description, duration, courseAuthorList)) {
			alert('Please, fill in all fields');
		} else {
			const newCourse = {
				title: title,
				description: description,
				creationDate: dateGenerator(),
				duration: +duration,
				authors: courseAuthorList.map((course) => course.id),
			};

			const response = await addNewCourse(
				newCourse,
				userTokenFromStore.token.result
			);

			if (response.successful) {
				newCourse.id = response.result.id;
				dispatch(coursesCreated(newCourse));
				history.push('/courses');
			} else {
				throw new Error(response);
			}
		}
	}

	function UpdateCourse() {
		if (!isValidNewCourse(title, description, duration, courseAuthorList)) {
			alert('Please, fill in all fields');
		} else {
			const updatedCourse = {
				title: title,
				description: description,
				duration: +duration,
				authors: courseAuthorList.map((course) => course.id),
			};
			dispatch(
				updateCourse(courseId, updatedCourse, userTokenFromStore.token.result)
			);
			history.push('/courses');
		}
	}

	useEffect(() => {
		if (desc) {
			const authorsIdsForUpdate = currentCourse[0].authors;
			let authorsForUpdate = [];
			authorsIdsForUpdate.forEach((element) => {
				let res = authorsFromStore.filter((author) => author.id === element);
				authorsForUpdate.push(res[0]);
			});

			setCourseAuthorList(authorsForUpdate);

			let authorsForUpdateNonSelected = authorsFromStore;
			authorsForUpdate.map((element) => {
				return (authorsForUpdateNonSelected =
					authorsForUpdateNonSelected.filter((author) => author !== element));
			});
			setAuthorsList(authorsForUpdateNonSelected);
		} else {
			setCourseAuthorList([]);
			setAuthorsList(authorsFromStore);
		}
	}, [desc]);

	return (
		<section className='create'>
			<div className='createTitleBlock'>
				<div className='inputTitle'>
					<label htmlFor='createTitleInput'>Title</label>
					<Input
						name='createTitleInput'
						type='text'
						placeholderText='Enter title...'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<MyButton
					onClick={desc ? UpdateCourse : CreateCourse}
					buttonText={desc ? 'Update Course' : 'Create Course'}
				/>
			</div>
			<div className='createDescriptionBlock'>
				<label htmlFor='createDescr'>Description</label>
				<textarea
					name='createDescr'
					type='text'
					placeholder='Enter description'
					value={description}
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
							value={duration}
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

export default CreateForm;
