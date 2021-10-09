import React from 'react';
import { Navbar, Nav, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function HeaderStudentsMetricsScTab ( props ) {
	const { setStudentsMetricsScsTab } = props;
	
	const handleChange = (val) => {
		console.log('val', val);
		if (val === 1) setStudentsMetricsScsTab(1);
		if (val === 2) setStudentsMetricsScsTab(2);
		if (val === 3) setStudentsMetricsScsTab(3);
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
							<ToggleButton id="tbg-btn-3" value={3}>
								Metrics
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

export default HeaderStudentsMetricsScTab;