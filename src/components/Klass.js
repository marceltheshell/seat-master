// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { Link, useRouteMatch } from 'react-router-dom';
//import RankDetails from './RankDetails';
import HeaderNav from './HeaderNav';
import HeaderSeatingCharts from './HeaderSeatingCharts';
import AddStudent from './AddStudent';
import HeaderKlass from './HeaderKlass';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import HeaderStudentsSeatingCharts from './HeaderStudentsSeatingCharts';
import Metrics from './Metrics';
import Students from './Students';
import { useAuth } from '../context/AuthContext';
import SeatingChart from './SeatingChart';
//import Student from './Student';
//import UpdateStudentForm from './UpdateStudentForm';
//import AddStudentForm from './AddStudentForm';

function Klass({match}) {
	
	const { currentUser } = useAuth();
	const hasFetchedStudents = useRef(false);
	const hasFetchedKlass = useRef(false);
	const hasFetchedSeatingCharts = useRef(false);
	const [klass, setKlass] = useState({});
	const [studentsMetricsScsView, setStudentsMetricsScsView] = useState(1);
	const [students, setStudents] = useState([]);
	const [seatingCharts, setSeatingCharts] = useState([]);
	const [seatingChart, setSeatingChart] = useState({});
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
		if (!hasFetchedKlass.current) {
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
			const fetchSCsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/seatingcharts`;
			const response = await SeatMasterApiClient.get(fetchSCsUrl, currentUser.authToken);
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
			<HeaderStudentsSeatingCharts  setStudentsMetricsScsView={setStudentsMetricsScsView} />
			<HeaderSeatingCharts studentsMetricsScsView={studentsMetricsScsView} seatingCharts={seatingCharts} setSeatingChart={setSeatingChart} klass={klass} />
			<Container>
				{studentsMetricsScsView === 2 && <SeatingChart seatingChart={seatingChart} />}
				{studentsMetricsScsView === 1 && <Students students={students} setStudents={setStudents} handleShowAddStudent={handleShowAddStudent} />}
				{studentsMetricsScsView === 3 && <Metrics />}
				<AddStudent showAddStudentModal={showAddStudentModal} handleCloseAddStudent={handleCloseAddStudent} />
			</Container>
		</React.Fragment>
	);
}

export default Klass;