import { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { saveImage } from '../helper/helper';
import { toast } from 'react-toastify';

const LayoutInputForm = ({ selectedClientData }) => {
    const [Image_Original_URL, setImage_Original_URL] = useState("")

    const handleFormData = async (fieldName, file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('Image_Type', '1');

        try {
            const response = await saveImage(formData);
            console.log('Image uploaded successfully:', response);
            toast.success('Image uploaded successfully');
            setImage_Original_URL(response?.extras?.Data?.Image_Original_URL)
            console.log("Image_Original_URL======>", setImage_Original_URL(response?.extras?.Data?.Image_Original_URL))
        } catch (error) {
            toast.error('Failed to upload image');
        }
    };

    return (
        <Container>
            <Title>Layout Input</Title>
            <FormContainer>
                <Form>
                    <InputContainer>
                        <Label>Background Image</Label>
                        <Input type="file" accept="image/*" name='backgroundImage' onChange={(e) => handleFormData("backgroundImage", e.target.files[0])} />
                    </InputContainer>
                    {Image_Original_URL && <PreviewImage src={Image_Original_URL} alt="Background Preview" />}
                    <InputContainer>
                        <Label>Profile Picture</Label>
                        <Input type="file" accept="image/*" name='profilePicture' onChange={(e) => handleFormData("profilePicture", e.target.files[0])} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Logo</Label>
                        <Input type="file" accept=".svg, .png, .jpg, .jpeg" name='companyLogo' onChange={(e) => handleFormData("companyLogo", e.target.files[0])} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Banner Image</Label>
                        <Input type="file" accept=".svg, .png, .jpg, .jpeg" name='bannerImage' onChange={(e) => handleFormData("bannerImage", e.target.files[0])} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Banner Video</Label>
                        <Input type="file" accept="video/*" name='bannerVideo' onChange={(e) => handleFormData("bannerVideo", e.target.files[0])} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Name of the Company</Label>
                        <Input type="text" name='companyName' onChange={(e) => handleFormData("companyName", e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Text for Intro</Label>
                        <Textarea name='introText' onChange={(e) => handleFormData("introText", e.target.value)} />
                    </InputContainer>

                    <Button >Save</Button>
                </Form>
                <RedBox />
            </FormContainer>
        </Container>
    );
};

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
    margin-right: 10px 
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
    margin-right: 10px 
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
    align-self: center
`;

const PreviewImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-top: 10px;
`;

const PreviewVideo = styled.video`
    max-width: 100%;
    height: auto;
    margin-top: 10px;
`;

const RedBox = styled.div`
    background-color: red;
    width: 40%;
    height: 300px;
`;

export default LayoutInputForm;
