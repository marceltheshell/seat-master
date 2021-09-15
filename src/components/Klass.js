// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Card, Container, Row, Col, ToggleButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { Link, useRouteMatch } from 'react-router-dom';
//import RankDetails from './RankDetails';
import Header from './Header';
import AddStudent from './AddStudent';
import KlassHeader from './KlassHeader';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import StudentsSeatingChartsHeader from './StudentsSeatingChartsHeader';
import { useAuth } from '../context/AuthContext';
import { PlusCircle } from 'react-bootstrap-icons';
//import Student from './Student';
//import UpdateStudentForm from './UpdateStudentForm';
//import AddStudentForm from './AddStudentForm';

function Klass({match}) {
	
	useEffect(() => {
		fetchKlass();
		fetchStudents();
	}, []);

	const { currentUser } = useAuth();
	const [klass, setKlass] = useState( {} );
	const [students, setStudents] = useState([]);
	const [showAddStudentModal, setShowAddStudentModal] = useState( false );
	// const [editStudentModalShow, setEditStudentModalShow] = useState( false );
	// const [showRanks, setShowRanks] = useState( false );
	
	const handleShowAddStudent = () => {
		setShowAddStudentModal(true);
	};

	const handleCloseAddStudent = () => {
		setShowAddStudentModal(false);
	};

	const fetchKlass = async () => {
		const fetchKlassUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/klasses/${match.params.id}`;
		const response = await SeatMasterApiClient.get(fetchKlassUrl, currentUser.authToken);
		setKlass(response.data);
	};

	const fetchStudents = async () => {
		const fetchStudentsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/students`;
		const response = await SeatMasterApiClient.get(fetchStudentsUrl, currentUser.authToken);
		setStudents(response.data);
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
			<StudentsSeatingChartsHeader />
			<Container>
				<Row className="klass-card-deck-style">
					{Boolean(students) && students && (students.map((student) => {
						return (
							<Link 
								className="klass-card-style" 
								to={`/students/${student.id}`}
								key={student.id}
							>	
								<Card className="text-center" >
									{/* <Card.Img top width="100%" src={value.image} alt="Card image cap" /> */}
									<Card.Body>
										<Card.Text >{student.name}</Card.Text>
									</Card.Body>
								</Card>
							</Link>		
						);
					}))}
					<Link
						className="klass-card-style"
						onClick={handleShowAddStudent}
					>
						<Card >
							<Card.Body>
								<Row>
									<Col>
										<h2 className="text-center"><PlusCircle /></h2>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Link>
				</Row>
				<AddStudent showAddStudentModal={showAddStudentModal} handleCloseAddStudent={handleCloseAddStudent} />
			</Container>
		</React.Fragment>
	);
}

export default Klass;