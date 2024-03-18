import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';


export default function Links({ selectedClientData }) {
    const [formData, setFormData] = useState({
        serialNumber: '',
        name: selectedClientData.Name || '',
        ClientID: selectedClientData.ClientID || '',
        Zoom_Meet_Link: selectedClientData.Zoom_Meet_Link || '',
        Google_Meet_Link: selectedClientData.Google_Meet_Link || '',

    });

    const [selectedLink, setSelctedLink] = useState("");

    const handleLinkSelection = (link) => {
        setSelctedLink(link)
    };
    const handleChange = (key, value) => {

        setFormData({
            ...formData,
            [key]: value
        })


    }
    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            ClientID: formData.ClientID,
            Zoom_Meet_Link: formData.Zoom_Meet_Link,
            Google_Meet_Link: formData.Google_Meet_Link,
        }

        fetchPostData("/Update_Client_Meeting_Links", request)
            .then(response => {
                const updatedData = { ...selectedClientData, ...request }
                localStorage.setItem('selectedClientData', JSON.stringify(updatedData))
                toast.success(response.extras.Status || 'Added Successfully')
            }).catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            })
    };

    return (
        <Container>
            <Title>Meeting Links</Title>
            <FormContainer onSubmit={handleSave}>
                <FormGroup>
                    <Label htmlFor="dropdown">Meeting links:</Label>
                    <Select
                        id="dropdown"
                        name="dropdown"
                        value={selectedLink}
                        onChange={(e) => handleLinkSelection(e.target.value)}
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
                        onChange={(e) => handleChange("serialNumber", e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="name">Premium permanent link (paid):</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </FormGroup>
                <Button >Save</Button>
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
