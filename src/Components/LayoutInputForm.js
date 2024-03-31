import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { toast } from 'react-toastify';
import FileInput from './FileInput';
import { fetchPostData } from '../helper/helper';

const LayoutInputForm = ({ selectedClientData }) => {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        setInputs({
            ClientID: selectedClientData.ClientID || '',
            Background_ImageID: '',
            Profile_ImageID: '',
            Logo_ImageID: '',
            Logo_Icon_ImageID: '',
            Company_Name: selectedClientData.Company_Name || '',
            Intro: selectedClientData.Intro || '',
            Banner_Array: []
        })
    }, [selectedClientData])



    const handleChange = (name, id, url) => {
        setInputs(prevInputs => {
            let updatedInputs = { ...prevInputs };
            if (name.startsWith('Banner_')) {
                const index = name.split('_')[1];

                const extension = url.split('.').pop().toLowerCase();
                const contentType = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension) ? 'image' : 'video';

                const newBanner = {
                    Media_Type: contentType === 'image' ? 1 : 2,
                };

                if (contentType === 'image') {
                    newBanner.ImageID = id;
                } else {
                    newBanner.VideoID = id;
                }

                if (!updatedInputs.Banner_Array) {
                    updatedInputs.Banner_Array = [];
                }

                updatedInputs.Banner_Array[index] = newBanner;
            } else {
                updatedInputs[name] = id;
                updatedInputs[`Whether_${name}_Available`] = !!url;
                updatedInputs[`URL${name}`] = url
            }
            return updatedInputs;
        });
    };

    const handleAddBanner = () => {
        setInputs(prevInputs => ({
            ...prevInputs,
            Banner_Array: [...prevInputs.Banner_Array, { id: '', type: '', url: '' }]
        }));
    };

    const handleSave = async () => {
        const request = {
            ClientID: inputs.ClientID,
            Whether_Background_Image_Available: !!inputs.Background_ImageID,
            Background_ImageID: inputs.Background_ImageID,
            Whether_Profile_Image_Available: !!inputs.Profile_ImageID,
            Profile_ImageID: inputs.Profile_ImageID,
            Whether_Logo_Image_Available: !!inputs.Logo_ImageID,
            Logo_ImageID: inputs.Logo_ImageID,
            Whether_Logo_Icon_Available: !!inputs.Logo_Icon_ImageID,
            Logo_Icon_ImageID: inputs.Logo_Icon_ImageID,
            Whether_Banner_Available: inputs.Banner_Array.length > 0,
            Banner_Array: inputs.Banner_Array,
            Company_Name: inputs.Company_Name,
            Intro: inputs.Intro
        };

        console.log('Request:', request);

        fetchPostData('/Update_Client_Input', request)
            .then(response => {
                if (response.success) {
                    const updatedData = { ...selectedClientData, ...request }
                    localStorage.setItem('selectedClientData', JSON.stringify(updatedData))
                    toast.success('Layout Input updated successfully.')
                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            });
    };


    return (
        <Container>
            <Title>Layout Input</Title>
            <FormContainer>
                <Form>
                    <FileInput label="Background Picture" name="Background_ImageID" onChange={(id, url) => handleChange('Background_ImageID', id, url)} accept="image/*" />
                    <FileInput label="Profile Picture" name="Profile_ImageID" onChange={(id, url) => handleChange('Profile_ImageID', id, url)} accept="image/*" />
                    <FileInput label="Logo" name="Logo_ImageID" onChange={(id, url) => handleChange('Logo_ImageID', id, url)} accept="image/*" />
                    <FileInput label="Logo Icon Image" name="Logo_Icon_ImageID" onChange={(id, url) => handleChange('Logo_Icon_ImageID', id, url)} accept="image/*" />
                    {inputs.Banner_Array && inputs.Banner_Array.map((banner, index) => (
                        <FileInput key={index} label={`Banner ${index + 1}`} name={`Banner_${index}`} onChange={(id, url) => handleChange(`Banner_${index}`, id, url)} accept="image/*, video/*" />
                    ))}
                    <Button type="button" onClick={handleAddBanner}>Add Banner</Button>
                    <InputContainer>
                        <Label>Name of the Company</Label>
                        <Input type="text" name="Company_Name" defaultValue={inputs.Company_Name} onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, Company_Name: e.target.value }))} />
                    </InputContainer>
                    <InputContainer>
                        <Label>Text for Intro</Label>
                        <Textarea
                            name="Intro"
                            value={inputs.Intro}
                            onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, Intro: e.target.value }))}
                        />
                    </InputContainer>

                    <Button type='button' onClick={handleSave}>Save</Button>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default LayoutInputForm;

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
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
    margin-top: 20px;
    align-self: center;
`;

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

const Textarea = styled.textarea`
    resize: vertical;
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