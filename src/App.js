import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Login.js';
import About from './About.js';
import Contact from './Contact.js';
import Home from './Home.js';
import Client from './Client';

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
				{userData?.SessionID && <Navbar />}
				<Routes>
					{userData?.SessionID ? (
						<Route path="/" element={<Home type={userData?.Role_Type}/>} />
					) : (
						<Route path="/" element={<Login />} />
					)}
					<Route path="/client/:ClientID?" element={<Client />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;