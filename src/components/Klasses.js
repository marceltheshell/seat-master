import React, { useEffect, useState, useRef } from 'react';
import NewHeader from './NewHeader';
import SeatMasterApiClient from '../clients/SeatMasterApiClient';
import { useAuth } from '../context/AuthContext';

function Klasses () {
	const { currentUser } = useAuth();
	const hasFetchedSchools = useRef(false);
	//const [klasses, setKlasses] = useState([]);
	const [schools, setSchools] = useState([]);

	

	const fetchSchools = async () => {
		if (!hasFetchedSchools.current) {
			const getSchoolsUrl = `${process.env.REACT_APP_DEV_SERVER_URL}/api/user_schools`;
			
			const schools = await SeatMasterApiClient.get(getSchoolsUrl, currentUser.id, currentUser.authToken );
		
			setSchools(schools);

			hasFetchedSchools.current = true;
		}
	};

	useEffect (() => {
		fetchSchools();
	}, [fetchSchools]);
	
	console.log(1111, schools);
	return (
		<React.Fragment>
			<NewHeader />
			<p>madafakin klasses page</p>
		</React.Fragment>
		
	);
}

export default Klasses;
