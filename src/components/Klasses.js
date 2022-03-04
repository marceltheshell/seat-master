import React, { useEffect, useState, useRef } from 'react';
import HeaderNav from './HeaderNav';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useAuth } from '../context/AuthContext';
import AddSchool from './AddSchool';
import AddKlass from './AddKlass';
import HeaderSchoolDisplay from './HeaderSchoolDisplay';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
// eslint-disable-next-line no-unused-vars
import { useRouteMatch, Link } from 'react-router-dom';
import '../_custom.scss';

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
	// eslint-disable-next-line no-unused-vars
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
			setKlasses(klasses.data);
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
			<HeaderNav />
			<HeaderSchoolDisplay
				school={school} 
				handleShowAddSchool={handleShowAddSchool} />
			<Container>
				<Row>
					<Col md={3}>
						<h1 className="block-header">My classes</h1>
					</Col>
					<Col className='center-vertically'>
						<Button
							variant='outline-light'
							onClick={handleShowAddKlass}
						>
							<PlusCircle size={25} />
						</Button>
					</Col>
				</Row>
				<Row className='padding-top'></Row>
				<Row className="klass-card-deck-style">
					{Boolean(klasses) && (klasses.map((klass) => {
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
				</Row>
			</Container>
			<AddSchool handleCloseAddSchool={handleCloseAddSchool} showAddSchoolModal={showAddSchoolModal} setSchool={setSchool}/>
			<AddKlass handleCloseAddKlass={handleCloseAddKlass} showAddKlassModal={showAddKlassModal} school={school}/>
		</React.Fragment>
		
	);
}

export default Klasses;
