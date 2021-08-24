import React, { useState } from 'react';
import { Navbar, Nav, Modal, Container, Button, Form } from 'react-bootstrap';
const axios = require('axios').default;

function Header () {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);
	
	const handleSubmitLogin = (e) => {
		console.log('hi');
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true); 
		//setShowLoginModal(false);

		const payload = {
			userName: userName,
			email: email,
			password: password
		};

		console.log('things got sent', payload);
		sendLoginData(payload);
	};

	const sendLoginData = async (teacher) => {
		try {
			const response = await axios.post(
				'http://127.0.0.1:9876/api/v1/teachers.json',
				teacher
			);
			console.log('resp', response);
		} catch (err) {
			console.log('error', err);
		}
	};

	const handleSubmitSignUp = (e) => {

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true); 
		//setShowLoginModal(false);

		const payload = {
			userName: userName,
			email: email,
			password: password
		};

		console.log('things got sent', payload);
		sendSignUpData(payload);
	};

	const sendSignUpData = async (signUpParams) => {
		try {
			const response = await axios.post(
				'http://127.0.0.1:9876/api/v1/teachers.json',
			);
			console.log('resp', response);
		} catch (err) {
			console.log('error', err);
		}
	};

	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Navbar.Brand href="/" className="brand-fontColor oswald-font" >SeatMaster</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link
							className="brand-fontColor oswald-font link-text-size" 
						>
							The Story
						</Nav.Link>
						<Nav.Link
							className="brand-fontColor oswald-font link-text-size" 
							onClick={() => setShowSignUpModal(true)}
						>
							Sign Up
						</Nav.Link>
						<Nav.Link 
							className="brand-fontColor oswald-font link-text-size" 
							onClick={() => setShowLoginModal(true)}
						>
							Login
						</Nav.Link>
						<Modal
							aria-labelledby="contained-modal-title-vcenter"
							centered
							show={showSignUpModal}
							onHide={() => {setShowSignUpModal(false);}}
						>
							<Form noValidate validated={validated} onSubmit={handleSubmitSignUp}  >
								<Modal.Header closeButton>
									<Modal.Title>Sign Up</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form.Group className="mb-3">
										<Form.Label>Username</Form.Label>
										<Form.Control 
											type="text"
											required
											onChange={event => setUserName(event.target.value)}
										/>
										<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">Please choose a username</Form.Control.Feedback>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Email</Form.Label>
										<Form.Control 
											type="email"
											required
											onChange={event => setEmail(event.target.value)}
										/>
										<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Password</Form.Label>
										<Form.Control 
											type="password"
											required
											onChange={event => setPassword(event.target.value)}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">Password field cannot be empty</Form.Control.Feedback>
									</Form.Group>
								</Modal.Body>
								<Modal.Footer>
									<div className="row justify-content-center">
										<Button
											type="submit"
											variant="primary"
										>
											Sign Up
										</Button>
									</div>
								</Modal.Footer>
							</Form>
						</Modal>
						<Modal
							aria-labelledby="contained-modal-title-vcenter"
							centered
							show={showLoginModal}
							onHide={() => {setShowLoginModal(false);}}
						>
							<Form noValidate validated={validated} onSubmit={handleSubmitLogin}>
								<Modal.Header closeButton>
									<Modal.Title>Log in</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form.Group className="mb-3">
										<Form.Label>Enter email</Form.Label>
										<Form.Control 
											type="email"
											required
											onChange={event => setUserName(event.target.value)}
										/>
										<Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Password</Form.Label>
										<Form.Control 
											type="password"
											required
											onChange={event => setPassword(event.target.value)}
										/>
										<Form.Control.Feedback type="invalid">Password field is required</Form.Control.Feedback>
									</Form.Group>
								</Modal.Body>
								<Modal.Footer>
									<div className="row justify-content-center">
										<Button 
											variant="primary"
											type="submit"
										>
											Log in
										</Button>
									</div>
								</Modal.Footer>
							</Form>
						</Modal>
					</Nav>  
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
}

export default Header;