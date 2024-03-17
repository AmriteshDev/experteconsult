import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';

export default function Links({ setTab }) {
    const [formData, setFormData] = useState({
        dropdown: '',
        serialNumber: '',
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any actions with the form data here
        console.log('Form data submitted:', formData);
    };

    return (
        <Container>
            <Title>Meeting Links</Title>
            <FormContainer onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="dropdown">Meeting links:</Label>
                    <Select
                        id="dropdown"
                        name="dropdown"
                        value={formData.dropdown}
                        onChange={handleChange}
                    >
                        <option value="">Select an option</option>
                        <option value="Modular">Zoom meets</option>
                        <option value="Independent">Google meet</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="serialNumber">Static permanent link:</Label>
                    <Input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="name">Premium permanent link (paid):</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button onClick={() => { setTab(4) }}>Save</Button>
            </FormContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 95%;
    margin: 20px auto;
    align-items: center;
    flex-direction: column;
    display: flex;
`;

const Title = styled.h1`
    color: ${colors.black};
`;

const FormContainer = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Label = styled.label`
    text-align: left;
    margin-bottom: 5px;
    color: ${colors.black};
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
`;

const Button = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    max-width: 150px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`;
