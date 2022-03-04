import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { useAuth } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
// eslint-disable-next-line no-unused-vars
import { useForm } from 'react-hook-form';
//import { Redirect } from 'react-router-dom';

function EditSeatingChart (props) {
	// const { currentUser } = useAuth();
	const { showAddSeatingChartModal, handleCloseAddSeatingChart } = props;
	// eslint-disable-next-line no-unused-vars
	const { register, handleSubmit, reset } = useForm();

	const resetErrors = () => {
		reset();
	};

	// eslint-disable-next-line no-unused-vars
	const handleSubmitAddSeatingChart = async (data) => {
	
	};
	
	return (
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showAddSeatingChartModal}
			onHide={handleCloseAddSeatingChart}
		>
			<Form onSubmit={handleSubmit(handleSubmitAddSeatingChart)} >
				<Modal.Header>
					<Modal.Title>New Seating Chart for {}</Modal.Title>
				</Modal.Header>
				{/* <Modal.Body>
					<Form.Group className="mb-3">
						<Form.Control 
							type="string"
							placeholder="name of school"
							required
							{...register('name', { required: true })}
						/>
					</Form.Group>
				</Modal.Body> */}
				<Modal.Footer>
					<div>
						<Button 
							variant="secondary" onClick={ () => {handleCloseAddSeatingChart(); resetErrors();}}>
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

export default EditSeatingChart;