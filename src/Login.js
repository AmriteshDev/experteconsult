import React, { useState } from 'react';
import axios from 'axios';
import Logo from './assets/images/logo.webp'

import { Button, FormGroup, Label, Input, CardImg } from "reactstrap";
import { toast } from 'react-toastify';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.experteconsult.com/admin/login', {
        EmailID: username,
        Password: password,
      });

      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = response.data;

      const userDetail = data.extras.AdminData
      localStorage.setItem('ProfileData', JSON.stringify(userDetail));

      window.location.href = '/'
    } catch (error) {
      console.error('Error:', error?.response?.data?.extras?.msg);
      toast.error(error?.response?.data?.extras?.msg || 'Something went wrong')
    }
  };

  return (
    <div className="background">
      <div className="login-box">
        <div className="container">
          <div className="row app-des">
            <div className="col left-background ">
              <h2>ExperteConsult</h2>
              <p>Powered by A.I. Technology</p>
              <CardImg className="mobile-img" src={Logo} alt="mobile-App" />
            </div>
            <div className="col login-form">
              <form>
                <h2 className="font-weight-bold mb-4">Login</h2>
                <FormGroup>
                  <Label className="font-weight-bold mb-2">Email</Label>
                  <Input className="mb-3" type="email" placeholder="email@example.com" onChange={(e) => setUsername(e.target.value)} />
                  <Label className="font-weight-bold mb-2">Password</Label>
                  <Input className="mb-3" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </FormGroup>
                <Button className="mt-3 btn-custom" onClick={handleSubmit}>Login</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;