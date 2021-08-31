import React, {useState}  from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
const loginUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/login`;

function LogIn (props) {
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	const { handleCloseLogIn, showLogInModal, setUsername, setAuthToken} = props;
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const resetErrors = () => {
		reset();
		setLoginErrorMessage('');
	};
	const handleSubmitLogIn = async (data) => {
		const payload = {
			'user': {
				'email': data.email,
				'password': data.password
			}
		};

		try {
			const response = await SeatMasterApiClient.post(loginUrl, payload);
			
			if(response.status === 401) {
				setLoginErrorMessage(response.error);
				reset();
				return;
			}
			// set username
			const name = _.get(response, 'data.attributes.username');
			setUsername(name);

			// set auth token
			const authToken = 'xyz';
			setAuthToken(authToken);


			handleCloseLogIn();
		} catch (err) {
			console.log('error in LoginComponent', err);
		}
	};

	return(
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showLogInModal}
			onHide={handleCloseLogIn}
		>
			<Form onSubmit={handleSubmit(handleSubmitLogIn)} >
				<Modal.Header>
					<Modal.Title>Log In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Control 
							type="email"
							placeholder="email"
							required
							{...register('email', { required: true })}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
							type="password"
							placeholder="password"
							required
							{...register('password', { required: true })}
						/>
						{errors.password && errors.password.type === 'minLength' && <p>{errors.password.message}</p>}
						{loginErrorMessage && <p>{loginErrorMessage}</p>}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<Button variant="secondary" onClick={ () => {handleCloseLogIn(); resetErrors();}}>
							Close
						</Button>
					</div>
					<div className="row justify-content-center">
						<Button
							type="submit"
							variant="primary"
						>
						Log In
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default LogIn;