import React, { useState, useContext, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { BsPaperclip } from 'react-icons/bs';
import { UserContext } from '../../context/UserContext';
import { API } from '../../config/api';

import './style.css';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<p style={{ padding: 20, color: 'green' }}>
					Thank you for adding your own books to our website, please wait 1 x 24
					hours to verify whether this book is your writing
				</p>
			</Modal.Body>
		</Modal>
	);
}

export default function AsideRight() {
	const [modalShow, setModalShow] = React.useState(false);
	const [state, dispatch] = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [bookz, setBooks] = useState([]);
	const [category, setCategory] = useState([]);

	const [formData, setFormData] = useState({
		title: '',
		publication: '',
		categoryId: '',
		isbn: '',
		file: '',
		images: '',
		about: '',
		pages: '',
		status: 'Waiting For Approval',
		userId: state.user.id,
	});

	const {
		title,
		publication,
		images,
		categoryId,
		pages,
		isbn,
		about,
		file,
		status,
		userId,
	} = formData;

	useEffect(() => {
		const loadBooks = async () => {
			try {
				setLoading(true);
				const res = await API.get('/books');
				setBooks(res.data.data.book);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		loadBooks();
	}, []);

	useEffect(() => {
		const loadCategory = async () => {
			try {
				setLoading(true);
				const res = await API.get('/categories');
				setCategory(res.data.data.categories);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};

		loadCategory();
	}, []);

	console.log(category);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleStore = async (e) => {
		e.preventDefault(e);

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const body = JSON.stringify({
				title,
				categoryId,
				publication,
				images,
				status,
				pages,
				isbn,
				about,
				file,
				userId,
			});

			console.log('coba');
			const res = await API.post('/books/post', body, config);
			setFormData({
				title: '',
				publication: '',
				categoryId: '',
				isbn: '',
				file: '',
				images: '',
				about: '',
				pages: '',
				status: 'Waiting For Approval',
				userId: state.user.id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1
				style={{
					fontFamily: 'classic',
					textAlign: 'left',
					marginTop: 20,
					fontStyle: 'bold',
					fontWeight: 800,
					marginBottom: 60,
				}}
			>
				Add Books
			</h1>

			<Form onSubmit={(e) => handleStore(e)}>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Control
						value={title}
						name="title"
						onChange={(e) => handleChange(e)}
						style={{ marginBottom: 30 }}
						size="lg"
						type="text"
						placeholder="Title"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicText">
					<Form.Control
						style={{ marginBottom: 30 }}
						value={publication}
						name="publication"
						onChange={(e) => handleChange(e)}
						size="lg"
						type="text"
						placeholder="Publication Date"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicText">
					<Form.Control
						style={{ marginBottom: 30 }}
						value={images}
						name="images"
						onChange={(e) => handleChange(e)}
						size="lg"
						type="text"
						placeholder="images"
					/>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlSelect1">
					<Form.Control
						as="select"
						style={{ marginBottom: 30 }}
						value={categoryId}
						name="categoryId"
						onChange={(e) => handleChange(e)}
						size="lg"
						type="text"
						placeholder="Category"
					>
						{category.map((item) => (
							<option value={`${item.id}`}>{item.name}</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="formBasicText">
					<Form.Control
						style={{ marginBottom: 30 }}
						value={pages}
						name="pages"
						onChange={(e) => handleChange(e)}
						size="lg"
						type="text"
						placeholder="Pages"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicText">
					<Form.Control
						style={{ marginBottom: 30 }}
						value={isbn}
						name="isbn"
						onChange={(e) => handleChange(e)}
						size="lg"
						type="text"
						placeholder="ISBN"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicText">
					<Form.Control
						style={{ marginBottom: 30 }}
						value={file}
						name="file"
						onChange={(e) => handleChange(e)}
						size="lg"
						type="text"
						placeholder="File"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicText">
					<Form.Control
						as="textarea"
						style={{ fontSize: 20 }}
						value={about}
						name="about"
						onChange={(e) => handleChange(e)}
						rows={8}
						placeholder="About This Book"
					/>
				</Form.Group>
				<div className="btn1">
					<button variant="secondary">
						Attache Book File <BsPaperclip style={{ fontSize: 30 }} />
					</button>
				</div>

				<div className="btn2">
					<button onClick={() => setModalShow(true)} type="submit">
						Add Books
					</button>
				</div>
			</Form>

			<br />
			<br />
			<br />

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
}
