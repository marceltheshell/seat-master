import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

function Header () {
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
					<Nav>
						<Nav.Item className="d-flex align-items-center">
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size " 
							>
								The Story
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<Nav className="ms-auto">
						{!currentUser && <Nav.Item className="d-flex align-items-center">
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
								onClick={handleShowSignUp}
							>
								Sign Up
							</Nav.Link>
						</Nav.Item>}
						{!currentUser && <Nav.Item className="d-flex align-items-center">
							<Nav.Link 
								className="brand-fontColor oswald-font link-text-size" 
								onClick={handleShowLogIn}
							>
								Login
							</Nav.Link>
						</Nav.Item>}
						{currentUser && <Nav.Item className="d-flex align-items-center">
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
							>
								{console.log('currentUser', currentUser)}
								{Boolean(currentUser) && currentUser.email}
							</Nav.Link>
						</Nav.Item>}
						{currentUser && <Nav.Item className="d-flex align-items-center">
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size "
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

export default Header;
