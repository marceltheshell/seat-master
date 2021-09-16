import React from 'react';
import { Container } from 'react-bootstrap';

function SeatingChart ( props ) {
	
	const { seatingChart } = props;
	const studentsPerTable = 4;

	return (
		<Container>
			<Row className="klass-card-deck-style">
				{seatingChart && (seatingChart.map((student, i) => {
					// need to load a variable with the number of students
					if (i % studentsPerTable) {
						return (
							<Link 
								className="klass-card-style" 
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
					}
				}))}
			</Row>
		</Container>
	);
}

export default SeatingChart;