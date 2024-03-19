import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';


export default function Links({ selectedClientData }) {
    const [formData, setFormData] = useState({
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
            // [selectedLink === 'Zoom' ? 'Zoom_Meet_Link' : 'Google_Meet_Link']: value
            [key]: value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        // const request = { ClientID: formData.ClientID }
        // if (selectedLink === 'Google') request.Google_Meet_Link = formData.Google_Meet_Link
        // if (selectedLink === 'Zoom') request.Zoom_Meet_Link = formData.Zoom_Meet_Link

        const request = {
            ClientID: formData.ClientID,
            Zoom_Meet_Link: formData.Zoom_Meet_Link,
            Google_Meet_Link: formData.Google_Meet_Link
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
                    <Label htmlFor="dropdown">Meeting links</Label>
                    <Select
                        id="dropdown"
                        name="dropdown"
                        value={selectedLink}
                        onChange={(e) => handleLinkSelection(e.target.value)}
                    >
                        <option value="">Select an option</option>
                        <option value="Zoom">Zoom meets</option>
                        <option value="Google">Google meet</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Meeting_links">Zoom_Meet_Link</Label>
                    <Input
                        type="text"
                        id="Zoom_Meet_Link"
                        name="Zoom_Meet_Link"
                        value={formData.Zoom_Meet_Link}
                        onChange={(e) => handleChange("Zoom_Meet_Link", e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="name">Google_Meet_Link</Label>
                    <Input
                        type="text"
                        id="Google_Meet_Link"
                        name="Google_Meet_Link"
                        value={formData.Google_Meet_Link}
                        onChange={(e) => handleChange("Google_Meet_Link", e.target.value)}
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
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: ${colors.black};
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
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
    width: 75%;
    padding: 10px;
    border: 1px solid ${colors.gray}; 
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer; 
    &:focus {
        outline: none; 
        border-color: ${colors.primary}; 
    }
    &:hover {
        border-color: ${colors.primary}; 
    }
    margin-right: 10px 
`;

const Input = styled.input`
    width: 75%;
    padding: 10px;
    border: 1px solid ${colors.gray}; 
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer; 
    &:focus {
        outline: none; 
        border-color: ${colors.primary}; 
    }
    &:hover {
        border-color: ${colors.primary}; 
    }
    margin-right: 10px 
`;

const Button = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    max-width: 150px;
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    align-self: center
`;
