import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
//import { Redirect } from 'react-router-dom';

function AddStudent (props) {
	const { currentUser } = useAuth();
	const { showAddStudentModal, handleCloseAddStudent } = props;
	const { register, handleSubmit, reset } = useForm();

	const resetErrors = () => {
		reset();
	};

	const handleSubmitAddStudent = async (data) => {
		const addStudentUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/users/${currentUser.id}/schools`;
		const payload = {
			'school': {
				'name': data.name
			}
		};

		try {
			const addStudentResponse = await SeatMasterApiClient.post(addStudentUrl, payload, currentUser.authToken);
			console.log(addStudentResponse);

			if(addStudentResponse.status === 401) {
				reset();
				return;
			}

			handleCloseAddStudent();

		} catch(err) {
			console.log('Err in Add Student', err);
		}
	};
	
	return (
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showAddStudentModal}
			onHide={handleCloseAddStudent}
		>
			<Form onSubmit={handleSubmit(handleSubmitAddStudent)} >
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
						<Button variant="secondary" onClick={ () => {handleCloseAddStudent(); resetErrors();}}>
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

export default AddStudent;