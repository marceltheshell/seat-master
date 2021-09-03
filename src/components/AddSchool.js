import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
//import { Redirect } from 'react-router-dom';

function AddSchool (props) {
	const { currentUser } = useAuth();
	const { showAddSchoolModal, handleCloseAddSchool, setSchool } = props;
	const { register, handleSubmit, reset } = useForm();

	const resetErrors = () => {
		reset();
	};

	const handleSubmitAddSchool = async (data) => {
		const addSchoolUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/users/${currentUser.id}/schools`;
		const payload = {
			'school': {
				'name': data.name
			}
		};

		try {
			const addSchoolResponse = await SeatMasterApiClient.post(addSchoolUrl, payload, currentUser.authToken);
			console.log(addSchoolResponse);

			if(addSchoolResponse.status === 401) {
				reset();
				return;
			}

			setSchool(addSchoolResponse.data.data.attributes);

			handleCloseAddSchool();

		} catch(err) {
			console.log('Err in Add School', err);
		}
	};
	
	return (
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showAddSchoolModal}
			onHide={handleCloseAddSchool}
		>
			<Form onSubmit={handleSubmit(handleSubmitAddSchool)} >
				<Modal.Header>
					<Modal.Title>Add your school</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Control 
							type="string"
							placeholder="name of school"
							required
							{...register('name', { required: true })}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<Button variant="secondary" onClick={ () => {handleCloseAddSchool(); resetErrors();}}>
							Close
						</Button>
					</div>
					<div className="row justify-content-center">
						<Button
							type="submit"
							variant="primary"
						>
						Add School
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default AddSchool;