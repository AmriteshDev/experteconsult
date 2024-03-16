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
            <RowContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="dropdown">meeting links:</Label>
                        <Select
                            id="dropdown"
                            name="dropdown"
                            value={formData.dropdown}
                            onChange={handleChange}
                        >
                            <option value="">Select an option</option>
                            <option value="Modular">zoom meets</option>
                            <option value="Independent">google meet</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="serialNumber">static permanent link:</Label>
                        <Input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="name">premium permanent link (paid):</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={() => { setTab(4) }}>Save</Button>
                    </FormGroup>
                </FormContainer>
            </RowContainer>
        </Container>

    );
};



const Container = styled.div`
  width: 95%;
  align-self: center;
  margin-top: 20px;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const Title = styled.h1`
  color: ${colors.black};
`;

const RowContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 80%;
  
`;

const FormContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  margin-bottom: 15px;
`;

const Label = styled.label`
    align-self: flex-start;
    text-align: left;
    display: block;
    margin-bottom: 5px;
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
    max-width: 150px;
    alige
    margin-top: 30px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    
`;

