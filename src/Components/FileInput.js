// FileInput.js
import React from 'react';
import styled from 'styled-components';
import { saveImage } from '../helper/helper';
import { toast } from 'react-toastify';
import colors from './colors';

const FileInput = ({ label, onChange }) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('Image_Type', '1');

        try {
            const response = await saveImage(formData);
            console.log('Image uploaded successfully:', response);
            toast.success('Image uploaded successfully');
            if (response.success) {
                const imageDetails = response?.extras?.Data
                onChange(imageDetails.ImageID, imageDetails.Image_Original_URL);
            }
        } catch (error) {
            toast.error('Failed to upload image');
        }
    };

    return (
        <InputContainer>
            <Label>{label}</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
        </InputContainer>
    );
};

export default FileInput;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    color: ${colors.black};
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    background-color: white; 
    color: ${colors.black}; 
    cursor: pointer; 
    &:focus {
        outline: none; 
        border-color: ${colors.primary}; 
    }
    &:hover {
        border-color: ${colors.primary}; 
    }
`;