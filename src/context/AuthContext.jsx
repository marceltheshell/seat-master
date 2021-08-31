import React, {useState} from 'react';
const AuthContext = React.createContext(null);


const AuthProvider = ({ user, children }) => {
	
	const [currentUser, setCurrentUser] = useState(user);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => React.useContext(AuthContext);

export {
	AuthProvider,
	useAuth
};