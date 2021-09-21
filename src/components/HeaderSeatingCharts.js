import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import AddSeatingChart from './AddSeatingChart';
import EditSeatingChart from './EditSeatingChart';
// import { PlusCircle } from 'react-bootstrap-icons';
import { Gear } from 'react-bootstrap-icons';

function HeaderSeatingCharts ( props ) {
	// eslint-disable-next-line no-unused-vars
	const { studentsView, seatingCharts, setSeatingChart } = props;
	const [showAddSeatingChartModal, setShowAddSeatingChartModal] = useState( false );
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
				<Nav className="ms-auto">
					{/* {!studentsView && <Nav.Item className="d-flex align-items-center ">
						<h3
							onClick={handleShowAddSeatingChart}
						>
							<PlusCircle />
						</h3>
					</Nav.Item>} */}
					{!studentsView &&  <Nav.Item className="d-flex align-items-center ">
						<h3
							onClick={handleShowEditSeatingChart}
						>
							<Gear />
						</h3>
					</Nav.Item>}
					{/* seatingCharts && seatingCharts.length > 0 && */}

					{!studentsView &&  <Nav.Item className="d-flex align-items-center ">
						<NavDropdown title="Saved Seating Charts" id="basic-nav-dropdown">
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
								New Seating Chart
							</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>}
				</Nav>
			</Navbar>
			<AddSeatingChart handleCloseAddSeatingChart={handleCloseAddSeatingChart} showAddSeatingChartModal={showAddSeatingChartModal} />
			<EditSeatingChart handleCloseEditSeatingChart={handleCloseEditSeatingChart} showEditSeatingChartModal={showEditSeatingChartModal} />
		</Container>
	);

}

export default HeaderSeatingCharts;