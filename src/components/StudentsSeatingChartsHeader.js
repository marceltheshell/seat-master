import React from 'react';
import { Navbar, Nav, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function StudentsSeatingChartsHeader () {
	const handleChange = (val) => {
		
		console.log('val', val);
	};
	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Nav className="m-auto">
					<Nav.Item className="d-flex align-items-center">
						<ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={handleChange}>
							<ToggleButton id="tbg-btn-1" value={1}>
								Students
							</ToggleButton>
							<ToggleButton id="tbg-btn-2" value={2}>
								Seating Charts
							</ToggleButton>
						</ToggleButtonGroup>
					</Nav.Item>
				</Nav>
			</Navbar>
		</Container>
	);

}

export default StudentsSeatingChartsHeader;