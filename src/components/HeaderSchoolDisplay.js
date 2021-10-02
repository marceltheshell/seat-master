import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { useAuth } from '../context/AuthContext';

function HeaderSchoolDisplay (props) {
	//const { currentUser } = useAuth();
	// eslint-disable-next-line no-unused-vars
	const { school, handleShowAddSchool } = props;
	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Nav className="ms-auto">
					<Nav.Item className="d-flex align-items-center" style={{paddingRight:'24px'}}>
						{ Boolean(school) && school.name}
					</Nav.Item>
					<Nav.Item>
						<Button
							onClick={handleShowAddSchool}
						>
							{school ? 'Change School' : 'Add School'}
						</Button>
					</Nav.Item>
				</Nav>
			</Navbar>
		</Container>
	);

}

export default HeaderSchoolDisplay;