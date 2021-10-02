import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import AddSeatingChart from './AddSeatingChart';
import EditSeatingChart from './EditSeatingChart';
// import { PlusCircle } from 'react-bootstrap-icons';
import { Gear } from 'react-bootstrap-icons';

function HeaderSeatingCharts ( props ) {
	const { studentsView, seatingCharts, setSeatingChart, klass } = props;
	const [showAddSeatingChartModal, setShowAddSeatingChartModal] = useState( true );
	const [showEditSeatingChartModal, setShowEditSeatingChartModal] = useState( false );
	
	const pickSeatingChart = (sc_id) => {
		const sc = seatingCharts.filter(sc => {
			return sc.id === Number(sc_id);
		})[0];
		setSeatingChart(sc);
	};

	const handleShowAddSeatingChart = () => {
		setShowAddSeatingChartModal(true);
	};

	const handleCloseAddSeatingChart = () => {
		setShowAddSeatingChartModal(false);
	};

	const handleShowEditSeatingChart = () => {
		setShowEditSeatingChartModal(true);
	};

	const handleCloseEditSeatingChart = () => {
		setShowEditSeatingChartModal(false);
	};
	
	return (
		<Container>
			<Navbar className="navbarClass" expand="lg">
				<Nav className="m-auto">
					{/* seatingCharts && seatingCharts.length > 0 && */}
					{!studentsView &&  <Nav.Item className="d-flex align-items-center ">
						<NavDropdown title="View Saved Seating Charts" id="basic-nav-dropdown">
							{seatingCharts && seatingCharts.map((sc, i) => {
								return (
									<NavDropdown.Item
										key={i}
										eventKey={sc.id}
										onSelect={pickSeatingChart}
									>
										{sc.name}
									</NavDropdown.Item>
								);
							})}
							<NavDropdown.Divider />
  							<NavDropdown.Item eventKey="4"
								onClick={handleShowAddSeatingChart}
							>
								Create New Seating Chart
							</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>}
					{!studentsView &&  <Nav.Item className="d-flex align-items-center ">
						<h3
							onClick={handleShowEditSeatingChart}
						>
							<Gear />
						</h3>
					</Nav.Item>}
				</Nav>
			</Navbar>
			<AddSeatingChart handleCloseAddSeatingChart={handleCloseAddSeatingChart} showAddSeatingChartModal={showAddSeatingChartModal} klass={klass} />
			<EditSeatingChart handleCloseEditSeatingChart={handleCloseEditSeatingChart} showEditSeatingChartModal={showEditSeatingChartModal} />
		</Container>
	);

}

export default HeaderSeatingCharts;