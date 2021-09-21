import React from 'react';
import HeaderNav from './HeaderNav';
import { Container, Col } from 'react-bootstrap';

function Welcome () {  
	return (
		<React.Fragment>
			<HeaderNav />
			<Container className="mt-5">
				<Col>
					<h1 className="text-center brand-main-text">Improve Groupwork in your Classroom</h1>
					<p className="text-center brand-tag-line">Better seating. Better groupwork. Better teaching.</p>
				</Col>
				{/* <Col xs={6}>
					<img src="images/school-class-3.jpg" alt="students_img"></img>
				</Col>  */}
		
				{/* <Row>
				<Col className="text-center mt-5">
					<Button className="oswald-font link-text-size" variant="primary" href="/klasses">Try it out</Button>
				</Col>               
			</Row> */}
			</Container>
		</React.Fragment>
	);
}

export default Welcome;