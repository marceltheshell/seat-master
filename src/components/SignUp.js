import React, { useState }  from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
	
function SignUp (props) {
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { showSignUpModal, handleCloseSignUp, setUsername, setAuthToken } = props;
	const [duplicateEmail, setDuplicateEmail] = useState('');
	const signUpUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/signup`;
	const loginUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/login`;

	console.log('validation errors', errors);
	const handleSubmitSignUp = async (data) => {
		const payload = {
			'user': {
				'username': data.username,
				'email': data.email,
				'password': data.password
			}
		};
		
		try {
			const response = await SeatMasterApiClient.post(signUpUrl, payload);
			
			if(response.status === 400 && response.message === 'Email already exists.') {
				setDuplicateEmail(data.email);
				reset();
				return;
			}

			try {
				delete payload.username;
				const response = await SeatMasterApiClient.post(loginUrl, payload);
				
				// set username
				const name = _.get(response, 'data.attributes.username');
				setUsername(name);

				// set auth token
				const authToken = 'xyz';
				setAuthToken(authToken);

			} catch (err) {
				console.log('error in login block of Sign Up component', err);
			}
			handleCloseSignUp();
		} catch (err) {
			console.log('error in Sign Up block of Sign Up component', err);
		}
	};
	
	return(
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showSignUpModal}
			onHide={handleCloseSignUp}
		>
			<Form onSubmit={handleSubmit(handleSubmitSignUp)} >
				<Modal.Header>
					<Modal.Title>SignUp</Modal.Title>
					<p>It's quick and easy</p>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="validationCustom01">
						<Form.Control 
							type="text"
							required
							placeholder="username"
							{...register('username', { required: true })}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
							type="email"
							placeholder="email"
							required
							onFocus={() => {setDuplicateEmail('');}}
							{...register('email', { required: true })}
						/>
						{duplicateEmail && <p>Oops. Looks like {duplicateEmail} already has an account.  Try a different email.</p> }
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
							type="password"
							placeholder="new password"
							required
							{...register('password', { required: true, minLength: {value: 4, message: 'Password must be at least 5 characters'} })}
						/>
						{errors.password && errors.password.type === 'minLength' && <p>{errors.password.message}</p>}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<Button variant="secondary" onClick={ () => {
							handleCloseSignUp(); 
							setDuplicateEmail('');
							reset();
						}}>
							Close
						</Button>
					</div>
					<div className="row justify-content-center">
						<Button
							type="submit"
							variant="primary"
						>
						Sign Up
						</Button>
					</div>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default SignUp;