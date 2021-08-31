import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Klasses from './Klasses';
import Welcome from './components/Welcome';
//import FormExample from './components/FormExample';
import NotFound from './components/NotFound';
// import Klass from './Klass';


function App() {
	const user = sessionStorage.getItem('user');
	return (
		<AuthProvider user={user}>
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" component={Welcome}/>
						<Route exact path="/klasses" component={Klasses}/>
						{/* <Route path="/klasses/:id" component={Klass}/> */}
						<Route component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
} 

export default App;
