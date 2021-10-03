import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SeatingChart ( props ) {
	const { seatingChart } = props;
	// eslint-disable-next-line no-unused-vars
	console.log('seatingChart', seatingChart);
	
	return (
		<Container>
			<Row className="klass-card-deck-style">
				
				{seatingChart && seatingChart.students && seatingChart.students.map((table) => {
					console.log('table', table);
					return (
						<Link
							className="klass-card-style" 
							key={table.id}
						>	
							<Card className="text-center card-sc-width" >
								{/* <Card.Img top width="100%" src={value.image} alt="Card image cap" /> */}
								<Card.Body>
									{table && table.map(student => {
										console.log('student', student);
										return (
											<Card.Text >{student.name}</Card.Text>
										);
									})}
									{/* <Card.Text >{student.name}</Card.Text> */}
								</Card.Body>
							</Card>
						</Link>	
					);
				})} 
			</Row>
		</Container>
	);
}

export default SeatingChart;