import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Login.js';
import Home from './Home.js';

function App() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUserData = localStorage.getItem("ProfileData");
		if (storedUserData) {
			setUserData(JSON.parse(storedUserData));
		}
		setLoading(false);
	}, []);

	return (
		<Router>
			<div className="App">
				{!loading && userData && userData.SessionID && <Navbar />}
				<Routes>
					{userData?.SessionID ?
						<Route path="/" element={<Home />} />
						:
						<Route path="/" element={<Login />} />
					}
				</Routes>
			</div>
		</Router>
	)
}

export default App;