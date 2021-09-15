import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useAuth } from '../context/AuthContext';
import AddSchool from './AddSchool';
import AddKlass from './AddKlass';
import SchoolDisplayHeader from './SchoolDisplayHeader';
import { Col, Row, Container, Card } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
// eslint-disable-next-line no-unused-vars
import { useRouteMatch, Link } from 'react-router-dom';

function Klasses () {
	//let { url } = useRouteMatch();
	const { currentUser } = useAuth();
	const hasFetchedSchools = useRef(false);
	const hasFetchedKlasses = useRef(false);
	// eslint-disable-next-line no-unused-vars
	const [klasses, setKlasses] = useState([]);
	const [school, setSchool] = useState(null);
	const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
	const [showAddKlassModal, setShowAddKlassModal] = useState(false);
	const handleCloseAddSchool = () => {
		setShowAddSchoolModal(false);
	};
	const handleShowAddSchool = () =>  {
		setShowAddSchoolModal(true);
	};
	const handleCloseAddKlass = () => {
		setShowAddKlassModal(false);
	};
	const handleShowAddKlass = () => {
		setShowAddKlassModal(true);
	};

	const fetchSchool = async () => {
		if (!hasFetchedSchools.current) {
			//const getSchoolsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/users/${currentUser.id}/schools`;
			const getSchoolsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/schools`;

			const schools = await SeatMasterApiClient.get(getSchoolsUrl, currentUser.authToken );
			
			if (schools && schools.data && schools.data[0]) {
				setSchool(schools.data[0]);
				hasFetchedSchools.current = true;
			}

			if (schools && schools.data && schools.data.length === 0) {
				handleShowAddSchool();
			}
		}
	};


	const fetchKlasses = async () => {
		if (!hasFetchedKlasses.current) {
			// get the klasses with the user id in the url first
			const getKlassesUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/klasses`;
			const klasses = await SeatMasterApiClient.get(getKlassesUrl, currentUser.authToken );
			setKlasses(klasses);
			hasFetchedKlasses.current = true;
		}
	};

	console.log('here are the school', school);

	useEffect (() => {
		fetchSchool();
		fetchKlasses();
	}, [fetchSchool, fetchKlasses]);
	
	return (
		<React.Fragment>
			<Header />
			<SchoolDisplayHeader school={school} handleShowAddSchool={handleShowAddSchool} />
			<Container>
				<Row>
					<Col>
						<h1 className="block-header">My classes</h1>
					</Col>
				</Row>
				<Row className="klass-card-deck-style">
					{Boolean(klasses) && klasses.data && (klasses.data.map((klass) => {
						return (
							<Link 
								className="klass-card-style" 
								to={`/klasses/${klass.id}`}
								key={klass.id}
							>	
								<Card className="text-center" >
									{/* <Card.Img top width="100%" src={value.image} alt="Card image cap" /> */}
									<Card.Body>
										<Card.Title >{klass.name}</Card.Title>
									</Card.Body>
								</Card>
							</Link>		
						);
					}))}
					<Link
						className="klass-card-style"
						onClick={handleShowAddKlass}
					>
						<Card >
							<Card.Body>
								<Card.Title className="text-center" >Add new class</Card.Title>
								<h2 className="text-center"><PlusCircle /></h2>
							</Card.Body>
						</Card>
					</Link>
				</Row>
				<Row>
				</Row>
			</Container>
			<AddSchool handleCloseAddSchool={handleCloseAddSchool} showAddSchoolModal={showAddSchoolModal} setSchool={setSchool}/>
			<AddKlass handleCloseAddKlass={handleCloseAddKlass} showAddKlassModal={showAddKlassModal} school={school}/>
		</React.Fragment>
		
	);
}

export default Klasses;
