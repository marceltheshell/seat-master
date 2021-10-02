import React, {useState, useEffect, useRef} from 'react';
import { Modal, Form, Button, Row, Col, NavDropdown, Container, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { XCircle } from 'react-bootstrap-icons';
// eslint-disable-next-line no-unused-vars
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
// eslint-disable-next-line no-unused-vars
import { useForm } from 'react-hook-form';
//import { Redirect } from 'react-router-dom';

function AddSeatingChart (props) {
	const hasFetchedMetrics = useRef();
	const [metrics, setMetrics] = useState([]);
	const { currentUser } = useAuth();
	const { showAddSeatingChartModal, handleCloseAddSeatingChart, klass } = props;
	const [metricsForSC, setMetricsForSC] = useState([]);
	const { register, handleSubmit, reset } = useForm();

	const resetErrors = () => {
		reset();
	};

	const handleSubmitAddSeatingChart = async (data) => {
		const payload = {
			'name': data.name,
			'numberOfTables': data.number,
			'metrics': metricsForSC
		};
		console.log('data', payload);
	};

	const removeMetric = (metricId) => {
		// eslint-disable-next-line no-unused-vars
		const newMetrics = metricsForSC.filter(metric => metric.id !== metricId);
		setMetricsForSC(newMetrics => [...newMetrics]);
	};

	const addMetric = (e) => {
		const inputMetric = metrics[e-1];
		const metricExists = metricsForSC.filter(metric => {
			return metric.id === inputMetric.id;
		});

		if (metricExists.length === 0) {
			setMetricsForSC(inputMetric => [...metricsForSC, inputMetric]);
		}
	};

	const fetchMetrics = async () => {
		if (!hasFetchedMetrics.current) {
			// get the klasses with the user id in the url first
			const getMetricsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/metrics`;
			const metrics = await SeatMasterApiClient.get(getMetricsUrl, currentUser.authToken );
			setMetrics(metrics.data);
			hasFetchedMetrics.current = true;
		}
	};

	useEffect(() => {
		fetchMetrics();
	}, [fetchMetrics]);
	
	return (
		<Modal
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showAddSeatingChartModal}
			onHide={handleCloseAddSeatingChart}
		>
			<Form onSubmit={handleSubmit(handleSubmitAddSeatingChart)} >
				<Modal.Header>
					<Container>
						<Modal.Title >Add Seating Chart for {klass.name} </Modal.Title>
					</Container>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col xs={12} md={6}>
								<Form.Group>
									<Form.Label>Seating Chart Name</Form.Label>
									<Form.Control 
										type="string"
										placeholder="ex: leveled reading groups"
										required
										{...register('name', { required: true })}
									/>
								</Form.Group>
							</Col>
							<Col xs={6} md={3}>
								<Form.Group className="mb-3">
									<Form.Label>Number of tables</Form.Label>
									<Form.Control 
										type="number"
										placeholder="ex: 3"
										required
										{...register('number', { required: true })}
									/>
								</Form.Group>
							</Col>
							<Col xs={6} md={3}>
								<Form.Group className="mb-3">
									<NavDropdown title="Add Metric" id="basic-nav-dropdown">
										{metrics && metrics.map((metric, i) => {
											return (
												<NavDropdown.Item
													key={i}
													eventKey={metric.id}
													onSelect={addMetric}
												>
													{metric.name}
												</NavDropdown.Item>
											);
										})}
									</NavDropdown>
								</Form.Group>
							</Col>
						</Row>
						<Col>
							Metrics to add
						</Col>
						<Col md={7}>
							{metricsForSC.length > 0 && metricsForSC.map((metric) => {
								return (
									<Card key={metric.id} >	
										<Card.Body>
											<Row>
												<Col><Card.Text >{metric.name}</Card.Text></Col>
												<Col md={2}>
													<h4
														onClick={()=>{removeMetric(metric.id);}}
													>
														<XCircle />
													</h4>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								);
							})}
						</Col>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<Button variant="secondary" onClick={ () => {handleCloseAddSeatingChart(); resetErrors();}}>
							Cancel
						</Button>
					</div>
					<div className="row justify-content-center">
						<Button
							type="submit"
							variant="primary"
						>
							Save
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default AddSeatingChart;