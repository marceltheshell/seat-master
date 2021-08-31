import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignUp from './SignUp';
import LogIn from './LogIn';

function NewHeader () {
	const [username, setUsername] = useState('');
	const [authToken, setAuthToken] = useState(null);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(true);
	console.log('auth token', authToken);

	const handleCloseSignUp = () =>  {
		setShowSignUpModal(false);
	};
	const handleShowSignUp = () =>  {
		setShowSignUpModal(true);
	};
	const handleCloseLogIn = () => {
		setShowLogInModal(false);
	};
	const handleShowLogIn = () =>  {
		setShowLogInModal(true);
	};

	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Navbar.Brand href="/" className="brand-fontColor oswald-font" >SeatMaster</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
							>
								The Story
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
								onClick={handleShowSignUp}
							>
								Sign Up
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link 
								className="brand-fontColor oswald-font link-text-size" 
								onClick={handleShowLogIn}
							>
								Login
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
							>
								{username && <p> Hello {username}!</p>}
							</Nav.Link>
						</Nav.Item>
						<SignUp handleCloseSignUp={handleCloseSignUp} showSignUpModal={showSignUpModal} setUsername={setUsername} setAuthToken={setAuthToken}/>
						<LogIn handleCloseLogIn={handleCloseLogIn} showLogInModal={showLogInModal} setUsername={setUsername} setAuthToken={setAuthToken}/>
					</Nav>  
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);

}

export default NewHeader;
