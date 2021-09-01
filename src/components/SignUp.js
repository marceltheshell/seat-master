import React, { useState }  from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
	
function SignUp (props) {
	const [redirect, setRedirect] = useState(null);
	const { setCurrentUser } = useAuth();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { showSignUpModal, handleCloseSignUp } = props;
	const [duplicateEmail, setDuplicateEmail] = useState('');
	const signUpUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/signup`;
	const loginUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/login`;

	const handleSubmitSignUp = async (data) => {
		const payload = {
			'user': {
				'username': data.username,
				'email': data.email,
				'password': data.password
			}
		};
		
		try {
			const signUpResponse = await SeatMasterApiClient.post(signUpUrl, payload);
			
			// error block
			if(_.get(signUpResponse, 'response.status') === 400) {
				setDuplicateEmail(data.email);
				reset();
				return;
			}
			//

			try {
				delete payload.username;
				const logInResponse = await SeatMasterApiClient.post(loginUrl, payload);
				
				const currentUser = {
					id: _.get(logInResponse, 'data.data.id'),
					username: _.get(logInResponse, 'data.data.attributes.username'),
					authToken: _.get(logInResponse, 'headers.authorization')
				};

				// set global current user	
				setCurrentUser(currentUser);

				// persist in session storage or local storage
				sessionStorage.setItem('user', currentUser);

				// close the modal
				handleCloseSignUp();

				// go to klasses page
				setRedirect('/Klasses');

			} catch (err) {
				console.log('error in login block of Sign Up component', err);
			}
			handleCloseSignUp();
		} catch (err) {
			console.log('error in Sign Up block of Sign Up component', err);
		}
	};

	if (redirect) {
		return (
			<Redirect to={redirect} />
		);
	}
	
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