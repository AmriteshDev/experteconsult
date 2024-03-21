import React from 'react'
import CheckBox from './CheckBox';
import colors from './colors';
import styled from 'styled-components';



export default function AdvanceBooking() {
    return (
        <Container>
            <Title>
                Availability details:
            </Title>
            <InputContainer>
                <Label>How far out can users book?</Label>
                <TextInput name='Description' rows={3} /> days ahead.
            </InputContainer>
            <InputContainer>
                <Label>Minimun meeting padding:</Label>
                <TextInput name='Description' rows={3} /> minutes.
            </InputContainer>
            <InputContainer>
                <Label>Bookers can't schedule within:</Label>
                <TextInput name='Description' rows={3} /> of current time.
            </InputContainer>
            <InputContainer>
                <Label>Available time slot interval:</Label>
                <TextInput name='Description' rows={3} /> of current time.
            </InputContainer>
            <CheckBox id={"Limit booking"} title={"Limit booking"} />
        </Container>
    )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 15px;
  background-color: ${colors.white};

`;
const Title = styled.h4`
    color: ${colors.black};
`;
const Label = styled.label`
  text-align: left;
  color: ${colors.black};
  min-width: 100px;
`;
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
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