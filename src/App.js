import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';

// import Klasses from './Klasses';
import Welcome from './components/Welcome';
//import FormExample from './components/FormExample';
// import NotFound from './NotFound';
// import Klass from './Klass';

function App() {	
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={Welcome}/>
					<Route path="/signup" component={SignUp} />
					{/* <Route exact path="/klasses" component={Klasses}/>  */}
					{/* <Route path="/klasses/:id" component={Klass}/> */}
					{/* <Route component={NotFound} /> */}
				</Switch>
			</div>
		</BrowserRouter>
	);
} 

export default App;
