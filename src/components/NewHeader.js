import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

function NewHeader () {
	const [redirect, setRedirect] = useState();
	const { currentUser, setCurrentUser } = useAuth();
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(false);

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
	const logOut = () => {
		setCurrentUser(null);
		sessionStorage.setItem('user', null);
		setRedirect('/');
	};

	if (redirect) {
		return <Redirect to={redirect} />;
	}

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
						{!currentUser && <Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
								onClick={handleShowSignUp}
							>
								Sign Up
							</Nav.Link>
						</Nav.Item>}
						{!currentUser && <Nav.Item>
							<Nav.Link 
								className="brand-fontColor oswald-font link-text-size" 
								onClick={handleShowLogIn}
							>
								Login
							</Nav.Link>
						</Nav.Item>}
						{currentUser && <Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
							>
								{currentUser && <p> Welcome back {currentUser.username}!</p>}
							</Nav.Link>
						</Nav.Item>}
						{currentUser && <Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size"
								onClick={logOut}
							>
								Logout
							</Nav.Link>
						</Nav.Item>}
						<SignUp handleCloseSignUp={handleCloseSignUp} showSignUpModal={showSignUpModal} />
						<LogIn handleCloseLogIn={handleCloseLogIn} showLogInModal={showLogInModal} />
					</Nav>  
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);

}

export default NewHeader;
