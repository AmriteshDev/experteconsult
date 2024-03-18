import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';

export default function Payment({ selectedClientData }) {
    const [formData, setFormData] = useState({
        Payment_Gateway_Type: 1
    });

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            Client_Code: formData.Client_Code,
            dropdown: formData.dropdown,
            serialNumber: formData.serialNumber,
            name: formData.name,

        }

        fetchPostData('/Update_Client_Basic_Information', request)
            .then(response => {
                if (response.success) {
                    const updatedData = { ...selectedClientData, ...request }
                    localStorage.setItem('selectedClientData', JSON.stringify(updatedData))
                    toast.success(response.extras.Status || 'Added Successfully')
                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            });
    };

    return (
        <Container>
            <Title>Payment Gateway</Title>
            <FormContainer>
                <Form onSubmit={handleSave}>
                    <FormGroup>
                        <Label htmlFor="dropdown">Payment Gateway</Label>
                        <Select
                            id="dropdown"
                            name="dropdown"
                            value={formData.dropdown}
                            onChange={(e) => handleChange("dropdown", e.target.value)}
                        >
                            <option value="">Select an option</option>
                            <option value="phonepay">PhonePay</option>
                            <option value="razorpay">Razorpay</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="serialNumber">Key</Label>
                        <Input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={(e) => handleChange("serialNumber", e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="name">Key Secret</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </FormGroup>
                    <Button >Save</Button>
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
