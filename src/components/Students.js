import React from 'react';
import { Table, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

function Students (props) {
	// eslint-disable-next-line no-unused-vars
	const { students, handleShowAddStudent, setStudents } = props;
	// eslint-disable-next-line no-unused-vars
	const handleMetricScoreChange = (score, student, metric) => {
		console.log('s', student);
		const studentsCopy = JSON.parse(JSON.stringify(students));
		const updatedStudent = student.metrics.find(m => m.name === metric.name).score = Number(score);
		const foundIndex = studentsCopy.findIndex(obj => obj.id === student.id );
		studentsCopy[foundIndex] = updatedStudent;
		setStudents(studentsCopy);
	};
	const deleteStudent = () => {

	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>id</th>
					<th>First Name</th>
					<th>Student Metrics</th>
					<th className='text-center'>Remove</th>
				</tr>
			</thead>
			<tbody>
				{students && (students.map((student, idx) => {
					return (
						<tr key={idx}>
							<td>{student.id}</td>
							<td>{student.name}</td>
							<td>
								{Boolean(student.metrics) && student.metrics.map((metric, idx2) => {
									return (
										<Row>
											<Col><p key={idx2}>{metric.name}</p></Col>
											<Col>
												<Dropdown onSelect={(score) => handleMetricScoreChange(score, student, metric)}>
													<Dropdown.Toggle 
														variant='outline-dark' 
														id="metric-score"
													>
														{metric.score}
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<Dropdown.Item eventKey='1'>1</Dropdown.Item>
														<Dropdown.Item eventKey='2'>2</Dropdown.Item>
														<Dropdown.Item eventKey='3'>3</Dropdown.Item>
														<Dropdown.Item eventKey='4'>4</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</Col>
										</Row>
									);
								})}
							</td>
							<td>
								<Col className='center-vertically center-horizontally'>
									<Button
										variant='outline-dark'
										onClick={deleteStudent}
									>
										<XCircle size={25} />
									</Button>
								</Col>
							</td>
						</tr>
					);
				}))}
			</tbody>
		</Table>
	);
}

export default Students;



// && students && (students.map((student) => {
// 					return (
// 						<Link 
// 							// className="klass-card-style"
// 							to={`/students/${student.id}`}
// 							key={student.id}
// 						>	
// 							<Card className="text-center klass-card-style" >
// 								{/* <Card.Img top width="100%" src={value.image} alt="Card image cap" /> */}
// 								<Card.Body>
// 									<Card.Text >{student.name}</Card.Text>
// 								</Card.Body>
// 							</Card>
// 						</Link>		
// 					);
// 				}))}
// 				{studentsView && <Link
// 					className="klass-card-style"
// 					onClick={handleShowAddStudent}
// 				>
// 					<Card >
// 						<Card.Body>
// 							<Row>
// 								<Col>
// 									<h2 className="text-center"><PlusCircle /></h2>
// 								</Col>
// 							</Row>
// 						</Card.Body>
// 					</Card>
// 				</Link>}