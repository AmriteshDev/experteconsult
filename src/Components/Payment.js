import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';

export default function Payment({ setTab }) {
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
            <Title>Payment Gateway</Title>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="dropdown">Payment Gateway:</Label>
                        <Select
                            id="dropdown"
                            name="dropdown"
                            value={formData.dropdown}
                            onChange={handleChange}
                        >
                            <option value="">Select an option</option>
                            <option value="phonepay">PhonePay</option>
                            <option value="razorpay">Razorpay</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="serialNumber">Key:</Label>
                        <Input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="name">Key Secret:</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button onClick={() => { setTab(5) }}>Save</Button>
                </Form>
            </FormContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 95%;
    align-self: center;
    margin-top: 20px;
    align-items: center;
    flex-direction: column;
    display: flex;
    background-color: #f5f5f5; 
`;
const Title = styled.h1`
    color: ${colors.black};
`;

const FormContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    align-self: flex-start;
    text-align: left;
    color: ${colors.black};
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
`;

const Button = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    max-width: 150px;
    margin-top: 30px;
`;
