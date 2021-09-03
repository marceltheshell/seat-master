import React, { useEffect, useState, useRef } from 'react';
import NewHeader from './NewHeader';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useAuth } from '../context/AuthContext';
import AddSchool from './AddSchool';
import { Button, Col, Row, Container } from 'react-bootstrap';

function Klasses () {
	const { currentUser } = useAuth();
	const hasFetchedSchools = useRef(false);
	//const [klasses, setKlasses] = useState([]);
	const [school, setSchool] = useState(null);
	const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);

	const handleCloseAddSchool = () => {
		setShowAddSchoolModal(false);
	};
	const handleShowAddSchool = () =>  {
		setShowAddSchoolModal(true);
	};

	const fetchSchool = async () => {
		if (!hasFetchedSchools.current) {
			const getSchoolsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/users/${currentUser.id}/schools`;

			const schools = await SeatMasterApiClient.get(getSchoolsUrl, currentUser.authToken );
			
			if (schools[0]) {
				setSchool(schools[0]);
			}

			hasFetchedSchools.current = true;

			if (schools.data.length === 0) handleShowAddSchool();
		}
	};

	console.log('here are the school', school);

	useEffect (() => {
		fetchSchool();
	}, [fetchSchool]);
	
	return (
		<React.Fragment>
			<NewHeader />
			<Container>
				<Row>
					<Col>
						{school && <h3 className="text-center">{school.name}</h3>}
					</Col>
					<Col>
						<Button
							onClick={handleShowAddSchool}
						>
							{school ? 'Change School' : 'Add School'}
						</Button>
					</Col>
				</Row>
			</Container>
			<AddSchool handleCloseAddSchool={handleCloseAddSchool} showAddSchoolModal={showAddSchoolModal} setSchool={setSchool}/>
		</React.Fragment>
		
	);
}

export default Klasses;
