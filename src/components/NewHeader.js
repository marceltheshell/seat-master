import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SignUp from './SignUp';


function NewHeader () {
	const [username, setUsername] = useState('');
	const [showSignUpModal, setShowSignUpModal] = useState(true);
	const handleClose = () =>  {
		console.log('inside set close');
		setShowSignUpModal(false);
	};
	const handleShow = () =>  {
		console.log('inside set show');
		setShowSignUpModal(true);
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
								onClick={handleShow}
							>
								Sign Up
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link 
								className="brand-fontColor oswald-font link-text-size" 
							>
								Login
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								className="brand-fontColor oswald-font link-text-size" 
							>
								{username && <p>{username}</p>}
							</Nav.Link>
						</Nav.Item>
						<SignUp handleClose={handleClose} showSignUpModal={showSignUpModal} setUsername={setUsername}/>
					</Nav>  
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);

}

export default NewHeader;
