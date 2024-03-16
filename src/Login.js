import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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

            if (userDetail.Role_Type === 1) {
                navigate('/home');
            } else if (userDetail.Role_Type === 2) {
                navigate('/client');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <LoginFormContainer>
            <LoginFormTitle>Login</LoginFormTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </LoginFormContainer>
    );
};

export default Login;

const LoginFormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.gray};
  border-radius: 8px;
`;

const LoginFormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.gray};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;