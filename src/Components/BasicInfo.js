import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';

export default function BasicInfo({ setTab }) {

    const [formData, setFormData] = useState({
        serialNo: '',
        name: '',
        phone: '',
        email: '',
        fbLink: '',
        instaLink: '',
        xLink: ''
    });


    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            serialNo: formData.serialNo,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            fbLink: formData.fbLink,
            instaLink: formData.instaLink,
            xLink: formData.xLink,
        }


        const url = "/Fetch_Client_Complete_Information";

        fetchPostData(url, request)
            .then(response => {
                if (response.success) {
                    toast.success(response.extras.Status || 'Added Successfully')

                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            });
    };
    return (
        <Container>
            <Title>Basic Info</Title>
            <FormContainer>
                <Column>
                    <FormGroup>
                        <Label htmlFor="serialNo">S.No:</Label>
                        <InputField id="serialNo" name='serialNo' placeholder="Serial No" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="name">Name:</Label>
                        <InputField id="name" name='name' placeholder="Enter Your Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="phone">Phone:</Label>
                        <InputField id="phone" name='phone' placeholder="Enter Your Phone" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <InputField id="email" name='email' placeholder="Enter Your Email Id" />
                    </FormGroup>
                </Column>
                <Column>
                    <FormGroup>
                        <Label htmlFor="fbLink">FB Link:</Label>
                        <InputField id="fbLink" name='fbLink' placeholder="facebook.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="instaLink">Insta Link:</Label>
                        <InputField id="instaLink" name='instaLink' placeholder="instagram.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="xLink">X Link:</Label>
                        <InputField id="xLink" name='xLink' placeholder="x.com" />
                    </FormGroup>
                </Column>
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
    width: 100%;
    margin-top: 20px;
`;

const Column = styled.div`
    flex: 1;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    text-align: left;
    color: ${colors.black};
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid ${colors.gray}; 
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
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
