// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Card, Container, Row, Col, ToggleButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { Link, useRouteMatch } from 'react-router-dom';
//import RankDetails from './RankDetails';
import Header from './Header';
import KlassHeader from './KlassHeader';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useAuth } from '../context/AuthContext';
//import Student from './Student';
//import UpdateStudentForm from './UpdateStudentForm';
//import AddStudentForm from './AddStudentForm';

function Klass({match}) {
	const { currentUser } = useAuth();
	useEffect(() => {
		fetchKlass();
	}, []);
	// eslint-disable-next-line no-unused-vars
	const [klass, setKlass] = useState( {} );
	// const [showRanks, setShowRanks] = useState( false );
	// const [student, setStudent] = useState( {} );
	// const [editStudentModalShow, setEditStudentModalShow] = useState( false );
	// const [AddStudentModalShow, setAddStudentModalShow] = useState( false );

	const fetchKlass = async () => {
		const fetchKlassUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/klasses/${match.params.id}`;
		// eslint-disable-next-line no-unused-vars
		const response = await SeatMasterApiClient.get(fetchKlassUrl, currentUser.authToken);
		setKlass(response.data);
	};

	// const updateStudent = async (student) => {
	// 	console.log("editing student!", student);
	// 	axios
	// };

	// const addStudent = async (student) => {
	// 	console.log(123, klass)
	// 	console.log("adding student!", student);
	// 	try {
	// 		const response = await axios.post(
	// 			'http://127.0.0.1:9876/api/v1/students.json',
	// 			student
	// 		)
	// 		console.log('resp', response);
	// 	} catch (err) {
	// 		console.log('error', err)
	// 	}
	// }

	// const onCardClick = (value) => {
	// 	setStudent(value);
	// 	setShowRanks(true);
	// };
	
	return (
		<React.Fragment>
			<Header/>
			<KlassHeader klass={klass} />
			<Container>
				<Col>
					<h1 className="block-header" > Students</h1>
				</Col>
				<Col>
					{klass.students && (klass.students.map((value, idx) => {
						return (
							<Card
								//onClick={() => onCardClick(value)}
								key={idx}
							>
								{/* <Card.Header as="h5"></Card.Header> */}
								<Card.Body>
									{value.first_name}
								</Card.Body>
								<Card.Body>
									<Button 
										className="oswald-font link-text-size" 
										variant="primary" 
										//onClick={() => {setEditStudentModalShow(true)}} 
									>
										Edit
									</Button>
								</Card.Body>
							</Card>
						);
					}))}
				</Col>
			</Container>
		</React.Fragment>
	);
}

export default Klass;