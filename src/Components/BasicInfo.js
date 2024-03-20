import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';

export default function BasicInfo({ selectedClientData }) {

    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            Client_Code: selectedClientData.Client_Code || '',
            Name: selectedClientData.Name || '',
            PhoneNumber: selectedClientData.PhoneNumber || '',
            EmailID: selectedClientData.EmailID || '',
            Facebook_Link: selectedClientData.Facebook_Link || '',
            Instagram_Link: selectedClientData.Instagram_Link || '',
            Twitter_Link: selectedClientData.Twitter_Link || '',
            ClientID: selectedClientData.ClientID,
            Plan_Type: selectedClientData.Plan_Type,
            Plan_Price: selectedClientData.Plan_Price,
            Discount: selectedClientData.Discount,
        })
    }, [selectedClientData])

    const handleForm = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            Client_Code: formData.Client_Code,
            Name: formData.Name,
            PhoneNumber: formData.PhoneNumber,
            EmailID: formData.EmailID,
            Facebook_Link: formData.Facebook_Link,
            Instagram_Link: formData.Instagram_Link,
            Twitter_Link: formData.Twitter_Link,
            ClientID: formData.ClientID,
            Plan_Type: formData.Plan_Type,
            Plan_Price: formData.Plan_Price,
            Discount: formData.Discount,
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
            <Title>Basic Informations</Title>
            <FormContainer >
                {/* <FormGroup>
                    <Label htmlFor="Client_Code">S.No</Label>
                    <InputField id="Client_Code" value={formData.Client_Code} onChange={(e) => handleForm("Client_Code", e.target.value)} name='Client_Code' placeholder="Serial No" />
                </FormGroup> */}
                <FormGroup>
                    <Label htmlFor="Name">Name</Label>
                    <InputField id="Name" name='Name' value={formData.Name} onChange={(e) => handleForm("Name", e.target.value)} placeholder="Enter Your Name" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="PhoneNumber">Phone</Label>
                    <InputField id="PhoneNumber" name='PhoneNumber' value={formData.PhoneNumber} onChange={(e) => handleForm("PhoneNumber", e.target.value)} placeholder="Enter Your Phone" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="EmailID">Email</Label>
                    <InputField id="EmailID" name='EmailID' value={formData.EmailID} onChange={(e) => handleForm("EmailID", e.target.value)} placeholder="Enter Your Email Id" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Facebook_Link">FB Link</Label>
                    <InputField id="Facebook_Link" name='Facebook_Link' value={formData.Facebook_Link} onChange={(e) => handleForm("Facebook_Link", e.target.value)} placeholder="facebook.com" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Instagram_Link">Insta Link</Label>
                    <InputField id="Instagram_Link" name='Instagram_Link' value={formData.Instagram_Link} onChange={(e) => handleForm("Instagram_Link", e.target.value)} placeholder="instagram.com" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Twitter_Link">X Link</Label>
                    <InputField id="Twitter_Link" name='Twitter_Link' value={formData.Twitter_Link} onChange={(e) => handleForm("Twitter_Link", e.target.value)} placeholder="x.com" />
                </FormGroup>
            </FormContainer>
            <Button onClick={handleSave}>Save</Button>
        </Container>
    )
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

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`;

const FormGroup = styled.div`
       display: flex;
       align-items: center;
       margin-bottom: 20px
`;

const Label = styled.label`
    text-align: left;
    color: ${colors.black};
    min-width: 100px;
`;

const InputField = styled.input`
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
`;
