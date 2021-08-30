import React, { useState }  from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
	
function SignUp (props) {
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { showSignUpModal, handleClose, setUsername } = props;
	const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
	const [duplicateEmailValue, setDuplicateEmailValue] = useState('');
	// const [userName, setUserName] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	//const [validated, setValidated] = useState(false);
	const resetErrors = () => {
		setIsDuplicateEmail(false);
	};

	console.log('validation errors', errors);
	const handleSubmitSignUp = async (data) => {
		console.log(1111, data);
		// const form = e.currentTarget;
		// e.preventDefault();
		// if (form.checkValidity() === false) {
		// 	e.stopPropagation();
		// } else {
		// handleClose();
		// setValidated(true); 
		const payload = {
			'user': {
				'username': data.username,
				'email': data.email,
				'password': data.password
			}
		};
		const url = `${process.env.REACT_APP_DEV_SERVER_URL}/api/signup`;

		// do a try catch block here, if it works then close form, if it doesn't then display err message
		let response;
		try {
			response = await SeatMasterApiClient.post(url, payload);
		} catch (err) {
			console.log('error here', err);
		}
		
		if(response.status === 400 && response.message === 'Email already exists.') {
			console.log('duplicate!');
			setIsDuplicateEmail(true);
			setDuplicateEmailValue(data.email);
		} else {			
			setUsername();
			// close form
			handleClose();
		}
		reset();
	};
	
	return(
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={showSignUpModal}
			onHide={handleClose}
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
							// onChange={event => setUserName(event.target.value)}
							{...register('username', { required: true })}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
							type="email"
							placeholder="email"
							required
							// onChange={event => setEmail(event.target.value)}
							{...register('email', { required: true })}
						/>
						{isDuplicateEmail && <p>Oops. Looks like {duplicateEmailValue} already has an account.  Try a different email.</p> }
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
							type="password"
							placeholder="new password"
							required
							// onChange={event => setPassword(event.target.value)}
							{...register('password', { required: true, minLength: {value: 4, message: 'Password must be at least 5 characters'} })}
						/>
						{errors.password && errors.password.type === 'minLength' && <p>{errors.password.message}</p>}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<Button variant="secondary" onClick={ () => {handleClose(); resetErrors();}}>
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