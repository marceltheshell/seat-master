import React, {useState} from 'react';
import { Table, Col, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

function Metrics (props) {
	// eslint-disable-next-line no-unused-vars
	const { metrics} = props;
	
	/* 	const handleToggleMetricToAdd = (e, metric) => {
		if (e === 0) {
			setMetricsToShow(metricsToShow => [...metricsToShow, metric]);
			// set elemnt to active	
		}
		if (e === 1) {
			setMetricsToShow(metricsToShow => metricsToShow.filter((m => m.id !== metric.id)));
			// set elemnt to inactive
		}
	}; */

	/* 	const handleDefaultMetricButtonValue = (metric) => {
		const res =  metricsToShow.filter(m => m.id === metric.id)[0] ? 0 : 1;
		console.log(res);
		return res;
	}; */
	// const setDefaultMetricButtonActive = (metric) => {
	// 	const res =  metricsToShow.filter(m => m.id === metric.id)[0] ? 1 : 2;
	// 	console.log(res);
	// 	return res;
	// };
	
	const [buttonToShow, setButtonToShow] = useState([1, 2]);

	const handleButtonChange = (val) => {
		console.log('val', val);
		if (val === 1) setButtonToShow([1]);
		if (val === 2) setButtonToShow([2]);
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Saved Metrics</th>
					<th>Add Metric to Class?</th>
					<th className='text-center'>Remove</th>
				</tr>
			</thead>
			<tbody>
				{metrics.map((metric,idx) => {
					// setDefaultMetricButtonActive(metric);
					return (
						<tr>
							<td>{metric.name}</td>
							<td>
								<ToggleButtonGroup 
									type="radio"
									name="radio" 
									defaultValue={buttonToShow} 
									onChange={handleButtonChange}
									
								>
									<ToggleButton
										key={idx}
										id={'metric-btn'+{idx}}
										variant='outline-dark'
										value={1}>
										Yes
									</ToggleButton>
									<ToggleButton 
										key={idx+1}
										id={'metric-btn-2'+{idx}}
										variant='outline-dark'
										value={2}>
										No
									</ToggleButton>
								</ToggleButtonGroup>
							</td>
							<td>
								<Col className='center-vertically center-horizontally'>
									<Button
										variant='outline-dark'
										onClick={() => {console.log('delet');}}
									>
										<XCircle size={25} />
									</Button>
								</Col>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}

export default Metrics;

