import React from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Klasses from './components/Klasses';
import Welcome from './components/Welcome';
//import FormExample from './components/FormExample';
import NotFound from './components/NotFound';
import Klass from './components/Klass';

function App() {
	const user = JSON.parse(sessionStorage.getItem('user'));
	return (
		<AuthProvider user={user}>
			<BrowserRouter>
				<div style={{ 
					backgroundColor: '#05386B',
					height: '1200px',
				}}>
					<Switch>
						<Route exact path="/" component={Welcome}/>
						<Route exact path="/klasses" component={Klasses}/>
						<Route path="/klasses/:id" component={Klass}/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
} 

export default App;
