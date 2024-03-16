import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Login';
import Home from './Home.js';
import Client from './Client.js';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("ProfileData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  console.log(userData)

  return (
    <Router>
      <div className="App">
        {userData?.SessionID && <Navbar />}
        <Routes>
          {userData?.SessionID ? (
            userData.Role_Type === 1 ? (
              <Route path="/" element={<Home />} />
            ) : userData.Role_Type === 2 ? (
              <Route path="/" element={<Client />} />
            ) : (
              <Route path="/" element={<Login />} />
            )
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/home" element={<Home />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
