import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Col, Button } from 'react-bootstrap';
import AddSeatingChart from './AddSeatingChart';
import EditSeatingChart from './EditSeatingChart';
import { PlusCircle } from 'react-bootstrap-icons';
import { Gear } from 'react-bootstrap-icons';

function HeaderSeatingCharts ( props ) {
	const { studentsMetricsScsTab, seatingCharts, setSeatingChart, klass } = props;
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
			<Navbar className="navbarClass" expand="lg" variant="dark">
				<Nav className="m-auto">
					{studentsMetricsScsTab === 2 &&  <Nav.Item className="d-flex align-items-center ">
						<NavDropdown title="View Saved Seating Charts" className="basic-nav-dropdown">
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
					{studentsMetricsScsTab === 2 &&  <Nav.Item className="d-flex align-items-center ">
						<h3
							onClick={handleShowEditSeatingChart}
						>
							<Gear />
						</h3>
					</Nav.Item>}
					{studentsMetricsScsTab === 1 && <Col className='center-vertically center-horizontally'>
						<Button
							variant='outline-light'
						>
							<PlusCircle size={25} />
						</Button>
					</Col>}
				</Nav>
			</Navbar>
			<AddSeatingChart handleCloseAddSeatingChart={handleCloseAddSeatingChart} showAddSeatingChartModal={showAddSeatingChartModal} klass={klass} />
			<EditSeatingChart handleCloseEditSeatingChart={handleCloseEditSeatingChart} showEditSeatingChartModal={showEditSeatingChartModal} />
		</Container>
	);

}

export default HeaderSeatingCharts;