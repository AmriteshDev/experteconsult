import { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';


const LayoutInputForm = ({ setTab }) => {

    const [backgroundImage, setBackgroundImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [introText, setIntroText] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerVideo, setBannerVideo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your logic for form submission, including file uploads
        // You may use FormData to handle file uploads.
        // Example: const formData = new FormData(); formData.append('backgroundImage', backgroundImage);
        // Send formData to your backend.
    };
    return (
        <Container>
            <Title>Layout Input</Title>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label>Background Image</Label>
                        <Input type="file" accept="image/*" onChange={(e) => setBackgroundImage(e.target.files[0])} />
                        {backgroundImage && <PreviewImage src={URL.createObjectURL(backgroundImage)} alt="Background Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Profile Picture</Label>
                        <Input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                        {profilePicture && <PreviewImage src={URL.createObjectURL(profilePicture)} alt="Profile Picture Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Logo</Label>
                        <Input type="file" accept=".svg, .png, .jpg, .jpeg" onChange={(e) => setCompanyLogo(e.target.files[0])} />
                        {companyLogo && <PreviewImage src={URL.createObjectURL(companyLogo)} alt="Logo Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Banner Image</Label>
                        <Input type="file" accept=".svg, .png, .jpg, .jpeg" onChange={(e) => setBannerImage(e.target.files[0])} />
                        {bannerImage && <PreviewImage src={URL.createObjectURL(bannerImage)} alt="Banner Image Preview" />}
                    </InputContainer>

                    <InputContainer>
                        <Label>Banner Video</Label>
                        <Input type="file" accept="video/*" onChange={(e) => setBannerVideo(e.target.files[0])} />
                        {bannerVideo && (
                            <PreviewVideo width="320" height="240" controls>
                                <source src={URL.createObjectURL(bannerVideo)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </PreviewVideo>
                        )}
                    </InputContainer>

                    <InputContainer>
                        <Label>Name of the Company</Label>
                        <Input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label>Text for Intro</Label>
                        <Textarea value={introText} onChange={(e) => setIntroText(e.target.value)} />
                    </InputContainer>

                    <Button onClick={() => { setTab(3) }}>Save</Button>
                </Form>
                <RedBox />
            </FormContainer>
        </Container>
    );
};

export default LayoutInputForm;

const Container = styled.div`
  width: 95%;
  align-self: center;
  margin-top: 20px;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const Title = styled.h1`
  color: ${colors.black};
`;

const FormContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 80%;
  margin-top: 3%;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;

 `;

const InputContainer = styled.div`
display: flex;
    align-items: center;
`;

const Label = styled.label`
  flex: 1;
  text-align: left;
  display: block;
    margin-bottom: 5px;
    align-self: flex-start;
`;

const Input = styled.input`
width: 100%;
padding: 8px;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
font-size: 14px;
`;

const Textarea = styled.textarea`
  flex: 1;
  min-height: 4em;
`;

const Button = styled.button`
    background-color: ${colors.primary};
    max-width: 150px;
    margin-top: 30px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`;

const PreviewImage = styled.img`
  /* Add any styles for image previews here */
`;

const PreviewVideo = styled.video`
  /* Add any styles for video previews here */
`;

const RedBox = styled.div`
  background-color: red;
  width: 40%;
  height: 300px;
`;
