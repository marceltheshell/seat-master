import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
	
function SignUp () {
	//const [showSignUpModal, setShowSignUpModal] = useState(true);
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	//const [validated, setValidated] = useState(false);
	
	const handleSubmitSignUp = (e) => {
		//const form = e.currentTarget;
		e.preventDefault();
		//if (form.checkValidity() === false) {
			
		//e.stopPropagation();
		// }
		//setValidated(true); 
		//setShowLoginModal(false);
		const payload = {
			'user': {
				'username': userName,
				'email': email,
				'password': password
			}
		};
		sendSignUpData(payload);
	};

	const sendSignUpData = async (signUpParams) => {
		console.log('signup params', signUpParams);		
		const url = `${process.env.REACT_APP_DEV_SERVER_URL}/api/signup`;
		////////
		const data = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signUpParams)
		});
		const thing = await data.json();
		console.log('data', thing);
		////////
		// try {
		// 	const response = await axios.post(
		// 		url,
		// 		signUpParams
		// 	);
		// 	console.log('resp', response);
		// } catch (err) {
		// 	console.log('err', err);
		// }
		////////
	};
	
	// <Modal
	// 	aria-labelledby="contained-modal-title-vcenter"
	// 	centered
	// 	show={showSignUpModal}
	// 	onHide={() => {setShowSignUpModal(false);}}
	// >
	return(
		<Container>
			<Form onSubmit={handleSubmitSignUp}  >
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control 
						type="text"
						required
						onChange={event => setUserName(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control 
						type="email"
						required
						onChange={event => setEmail(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control 
						type="password"
						required
						onChange={event => setPassword(event.target.value)}
					/>
				</Form.Group>
				<div className="row justify-content-center">
					<Button
						type="submit"
						variant="primary"
					>
					Sign Up
					</Button>
				</div>
			</Form>
		</Container>
	);
	// </Modal>;
}

export default SignUp;