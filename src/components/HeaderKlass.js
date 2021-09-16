import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function HeaderKlass (props) {
	const { klass } = props;
	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Nav className="m-auto">
					<Nav.Item className="d-flex align-items-center">
						{ Boolean(klass) && klass.name}
					</Nav.Item>
				</Nav>
			</Navbar>
		</Container>
	);

}

export default HeaderKlass;