import React, { useState } from 'react';
import { Navbar, Nav, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

function HeaderStudentsSeatingCharts ( props ) {
	const { setStudentsView, studentsView, handleShowAddSeatingChart } = props;
	// eslint-disable-next-line no-unused-vars
	const [showEditSeatingChartModal, setShowEditSeatingChartModal] = useState(false);
	const handleChange = (val) => {
		if (val === 1) setStudentsView(true);
		if (val === 2) setStudentsView(false);
	};
	
	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Nav className="m-auto">
					<Nav.Item className="d-flex align-items-center ">
						<ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={handleChange}>
							<ToggleButton id="tbg-btn-1" value={1}>
								Students
							</ToggleButton>
							<ToggleButton id="tbg-btn-2" value={2}>
								Seating Charts
							</ToggleButton>
						</ToggleButtonGroup>
					</Nav.Item>
					{!studentsView && <Nav.Item className="d-flex align-items-center ">
						<h3
							onClick={handleShowAddSeatingChart}
						>
							<PlusCircle />
						</h3>
					</Nav.Item>}
					{!studentsView && <Nav.Item className="d-flex align-items-center ">
						<h3>
							<PlusCircle />
						</h3>
					</Nav.Item>}
					{!studentsView && <Nav.Item className="d-flex align-items-center ">
						<ToggleButtonGroup type="radio" name="options">
							<ToggleButton>
								Seating Charts
							</ToggleButton>
						</ToggleButtonGroup>
					</Nav.Item>}
				</Nav>
				{/* <Nav className="ms-auto">
					<Nav.Item className="d-flex align-items-center">
						hello there darius the great
					</Nav.Item>
				</Nav> */}
			</Navbar>
		</Container>
	);

}

export default HeaderStudentsSeatingCharts;