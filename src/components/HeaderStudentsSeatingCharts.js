import React from 'react';
import { Navbar, Nav, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function HeaderStudentsSeatingCharts ( props ) {
	const { setStudentsView } = props;
	const handleChange = (val) => {
		if (val === 1) setStudentsView(true);
		if (val === 2) setStudentsView(false);
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

export default HeaderStudentsSeatingCharts;