import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';
import colors from './colors';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AboutUs({ selectedClientData }) {
    const [formData, setFormData] = useState({
        ClientID: selectedClientData.ClientID || '',
        About_Us: selectedClientData.About_Us || ''
    });

    const handleForm = (value) => {
        setFormData({
            ...formData,
            About_Us: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const request = { ClientID: formData.ClientID, About_Us: formData.About_Us }

        fetchPostData("/Update_Client_About_Us", request)
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
            <Title>About Us</Title>
            <ReactQuill theme="snow" value={formData.About_Us} onChange={handleForm} />
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