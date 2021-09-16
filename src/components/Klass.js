// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Card, Container, Row, Col, ToggleButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { Link, useRouteMatch } from 'react-router-dom';
//import RankDetails from './RankDetails';
import HeaderNav from './HeaderNav';
import AddStudent from './AddStudent';
import HeaderKlass from './HeaderKlass';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import HeaderStudentsSeatingCharts from './HeaderStudentsSeatingCharts';
import AddSeatingChart from './AddSeatingChart';
import { useAuth } from '../context/AuthContext';
import { PlusCircle } from 'react-bootstrap-icons';
import SeatingChart from './SeatingChart';
//import Student from './Student';
//import UpdateStudentForm from './UpdateStudentForm';
//import AddStudentForm from './AddStudentForm';

function Klass({match}) {
	
	const { currentUser } = useAuth();
	const hasFetchedStudents = useRef(false);
	const hasFetchedKlass = useRef(false);
	const hasFetchedSeatingCharts = useRef(false);
	const [klass, setKlass] = useState( {} );
	const [studentsView, setStudentsView] = useState(true);
	const [students, setStudents] = useState([]);
	const [seatingCharts, setSeatingCharts] = useState([]);
	const [showAddStudentModal, setShowAddStudentModal] = useState( false );
	const [showAddSeatingChartModal, setShowAddSeatingChartModal] = useState( false );
	// const [editStudentModalShow, setEditStudentModalShow] = useState( false );
	// const [showRanks, setShowRanks] = useState( false );
	const handleShowAddSeatingChart = () => {
		setShowAddSeatingChartModal(true);
	};

	const handleCloseAddSeatingChart = () => {
		setShowAddSeatingChartModal(false);
	};

	const handleShowAddStudent = () => {
		setShowAddStudentModal(true);
	};

	const handleCloseAddStudent = () => {
		setShowAddStudentModal(false);
	};

	const fetchKlass = async () => {
		if (!hasFetchedKlass) {
			const fetchKlassUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/klasses/${match.params.id}`;
			const response = await SeatMasterApiClient.get(fetchKlassUrl, currentUser.authToken);
			setKlass(response.data);
			hasFetchedKlass.current = true;
		}
	};

	const fetchStudents = async () => {
		if (!hasFetchedStudents.current) {
			const fetchStudentsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/students`;
			const response = await SeatMasterApiClient.get(fetchStudentsUrl, currentUser.authToken);
			setStudents(response.data);
			hasFetchedStudents.current = true;
		}
	};

	const fetchSeatingCharts = async () => {
		if (!hasFetchedSeatingCharts.current) {
			const fetchStudentsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/students`;
			const response = await SeatMasterApiClient.get(fetchStudentsUrl, currentUser.authToken);
			setSeatingCharts(response.data);
			hasFetchedSeatingCharts.current = true;
		}
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

	useEffect(() => {
		fetchKlass();
		fetchStudents();
		fetchSeatingCharts();
	}, [fetchKlass, fetchStudents, fetchSeatingCharts]);
	
	return (
		<React.Fragment>
			<HeaderNav/>
			<HeaderKlass klass={klass} />
			<HeaderStudentsSeatingCharts studentsView={studentsView} setStudentsView={setStudentsView} handleShowAddSeatingChart={handleShowAddSeatingChart} seatingCharts={seatingCharts} />
			<Container>
				<Row className="klass-card-deck-style">
					{!studentsView && <SeatingChart seatingCharts={seatingCharts} />}
					{studentsView && Boolean(students) && students && (students.map((student) => {
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
					{studentsView && <Link
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
					</Link>}
				</Row>
				<AddStudent showAddStudentModal={showAddStudentModal} handleCloseAddStudent={handleCloseAddStudent} />
				<AddSeatingChart handleCloseAddSeatingChart={handleCloseAddSeatingChart} showAddSeatingChartModal={showAddSeatingChartModal} />
			</Container>
		</React.Fragment>
	);
}

export default Klass;