import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';
import colors from './colors';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Customers({ selectedClientData }) {
    const [formData, setFormData] = useState({
        ClientID: selectedClientData.ClientID || '',
        Terms_and_Conditions: selectedClientData.Terms_and_Conditions || ''
    });

    const handleForm = (value) => {
        setFormData({
            ...formData,
            Terms_and_Conditions: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const request = { ClientID: formData.ClientID, Terms_and_Conditions: formData.Terms_and_Conditions }

        fetchPostData("/Update_Client_Terms_and_Conditions", request)
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
            <Title>Customers</Title>
            <ReactQuill theme="snow" value={formData.Terms_and_Conditions} onChange={handleForm} />
            <Button onClick={handleSave}>Save</Button>
        </Container>
    );
}

const Container = styled.div`
    width: 95%;
    margin: 20px auto;
    align-items: center;
    flex-direction: column;
    display: flex;
    .quill{
        width: 100%
    }
    .ql-container{
        height: 300px
    }
`;

const Title = styled.h1`
    color: ${colors.black};
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