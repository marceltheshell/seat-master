import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
//import { Redirect } from 'react-router-dom';

function AddKlass (props) {
	const { currentUser } = useAuth();
	const { showAddKlassModal, handleCloseAddKlass } = props;
	const { register, handleSubmit, reset } = useForm();

	const resetErrors = () => {
		reset();
	};

	const handleSubmitAddKlass = async (data) => {
		const addKlassUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/users/${currentUser.id}/schools`;
		const payload = {
			'school': {
				'name': data.name
			}
		};

		try {
			const addKlassResponse = await SeatMasterApiClient.post(addKlassUrl, payload, currentUser.authToken);
			console.log(addKlassResponse);

			if(addKlassResponse.status === 401) {
				reset();
				return;
			}

			handleCloseAddKlass();

		} catch(err) {
			console.log('Err in Add Klass', err);
		}
	};
	
	return (
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showAddKlassModal}
			onHide={handleCloseAddKlass}
		>
			<Form onSubmit={handleSubmit(handleSubmitAddKlass)} >
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
						<Button variant="secondary" onClick={ () => {handleCloseAddKlass(); resetErrors();}}>
							Close
						</Button>
					</div>
					<div className="row justify-content-center">
						<Button
							type="submit"
							variant="primary"
						>
						Add Klass
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default AddKlass;