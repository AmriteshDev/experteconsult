import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Login.js';
import Home from './Home.js';

function App() {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const storedUserData = localStorage.getItem("ProfileData");
		if (storedUserData) {
			setUserData(JSON.parse(storedUserData));
		}
	}, []);

	return (
		<Router>
			<div className="App">
				<Routes>
					{userData?.SessionID ?
						<Route path="/" element={<Navbar />} />
						:
						<Route path="/" element={<Login />} />
					}
				</Routes>
			</div>
		</Router>
	)
}

export default App;