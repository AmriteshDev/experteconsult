import React from 'react';
import styled from 'styled-components';
import colors from './colors';


export default function BasicInfo({ setTab }) {
    return (
        <Container>
            <Title>Basic Info</Title>
            <FormContainer>
                <Column>
                    <Row>
                        <Label>S.No:</Label>
                        <InputField placeholder="Serial No" />
                    </Row>
                    <Row>
                        <Label>Name</Label>
                        <InputField placeholder="Enter Your Name" />
                    </Row>
                    <Row>
                        <Label>Phone</Label>
                        <InputField placeholder="Enter Your Phone" />
                    </Row>
                    <Row>
                        <Label>Email</Label>
                        <InputField placeholder="Enter Your Email Id" />
                    </Row>
                </Column>
                <Column>
                    <Row>
                        <Label>FB Link</Label>
                        <InputField placeholder="facebook.com" />
                    </Row>
                    <Row>
                        <Label>Insta Link</Label>
                        <InputField placeholder="instagram.com" />
                    </Row>
                    <Row>
                        <Label>X Link</Label>
                        <InputField placeholder="x.com" />
                    </Row>
                </Column>
            </FormContainer>
            <Button onClick={() => { setTab(1) }}>Save</Button>
        </Container>
    )
}

const Container = styled.div`
  width: 95%;
  margin: 20px auto; /* Adjusting margin */
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const Title = styled.h1`
  color: ${colors.black};
`;

const FormContainer = styled.div`
  display: flex;
  width: 80%;
  margin-top: 3%;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 5%; /* Adjusting margin */
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Adjusting margin */
`;

const Label = styled.span`
  flex: 1;
  text-align: left;
  color: ${colors.black}; /* Setting text color */
`;

const InputField = styled.input`
    flex: 1;
    border: 1px solid ${colors.gray}; 
    border-width: 1px;
    border-style: solid;
    margin-left: 10px;
    border-color: rgb(193, 193, 193);
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
`;

const Button = styled.button`
        background-color: ${colors.primary};
        color: ${colors.white};
        max-width: 150px;
        margin-top: 30px;
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
`;