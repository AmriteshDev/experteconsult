import { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';

const LayoutInputForm = ({ selectedClientData }) => {
    // const [backgroundImage, setBackgroundImage] = useState(null);
    // const [profilePicture, setProfilePicture] = useState(null);
    // const [companyLogo, setCompanyLogo] = useState(null);
    // const [companyName, setCompanyName] = useState('');
    // const [introText, setIntroText] = useState('');
    // const [bannerImage, setBannerImage] = useState(null);
    // const [bannerVideo, setBannerVideo] = useState(null);

    const [formData, setFormData] = useState({
        backgroundImage: "",
        profilePicture: "",
        companyLogo: "",
        companyName: "",
        introText: "",
        bannerVideo: "",
        bannerImage: "",
        ClientID: selectedClientData.ClientID,
    })

    const handleFormData = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            backgroundImage: formData.backgroundImage,
            profilePicture: formData.profilePicture,
            companyLogo: formData.companyLogo,
            companyName: formData.companyName,
            introText: formData.introText,
            bannerVideo: formData.bannerVideo,
            bannerImage: formData.bannerImage,
            ClientID: formData.ClientID,

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
            <Title>Layout Input</Title>
            <FormContainer>
                <Form onSubmit={handleSave}>
                    <InputContainer>
                        <Label>Background Image</Label>
                        <Input type="file" accept="image/*" name='backgroundImage' value={formData.backgroundImage} onChange={(e) => handleFormData("backgroundImage", e.target.files[0])} />
                        {formData.backgroundImage && <PreviewImage src={URL.createObjectURL(formData.backgroundImage)} alt="Background Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Profile Picture</Label>
                        <Input type="file" accept="image/*" name='profilePicture' value={formData.profilePicture} onChange={(e) => handleFormData("profilePicture", e.target.files[0])} />
                        {formData.profilePicture && <PreviewImage src={URL.createObjectURL(formData.profilePicture)} alt="Profile Picture Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Logo</Label>
                        <Input type="file" accept=".svg, .png, .jpg, .jpeg" name='companyLogo' value={formData.companyLogo} onChange={(e) => handleFormData("companyLogo", e.target.files[0])} />
                        {formData.companyLogo && <PreviewImage src={URL.createObjectURL(formData.companyLogo)} alt="Logo Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Banner Image</Label>
                        <Input type="file" accept=".svg, .png, .jpg, .jpeg" name='bannerImage' value={formData.bannerImage} onChange={(e) => handleFormData("bannerImage", e.target.files[0])} />
                        {formData.bannerImage && <PreviewImage src={URL.createObjectURL(formData.bannerImage)} alt="Banner Image Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Banner Video</Label>
                        <Input type="file" accept="video/*" name='bannerVideo' value={formData.bannerVideo} onChange={(e) => handleFormData("bannerVideo", e.target.files[0])} />
                        {formData.bannerVideo && (
                            <PreviewVideo width="320" height="240" controls>
                                <source src={URL.createObjectURL(formData.bannerVideo)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </PreviewVideo>
                        )}
                    </InputContainer>

                    <InputContainer>
                        <Label>Name of the Company</Label>
                        <Input type="text" name='companyName' value={formData.companyName} onChange={(e) => handleFormData("companyName", e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Text for Intro</Label>
                        <Textarea name='introText' value={formData.introText} onChange={(e) => handleFormData("introText", e.target.value)} />
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
    padding: 8px;
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    resize: vertical;
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
