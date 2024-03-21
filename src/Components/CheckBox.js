import React, { useState } from 'react'
import styled from 'styled-components'
import colors from './colors'

export default function CheckBox({ id, title, description }) {

    const [isChecked, setIsChecked] = useState(false)
    const handleCheckBox = () => {
        console.log(id)
        setIsChecked(!isChecked)
    }

    return (
        <Container>
            <input type='checkbox' id={id} value={isChecked} onChange={handleCheckBox} />
            <Title>
                {title}
            </Title>
            <Description>
                {description}
            </Description>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  // flex-direction: column;
  margin-top: 10px;
  border-radius: 15px;
  background-color: ${colors.white};

`;
const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 9px;
`;
const RadioButtonRow = styled.div`
  display: flex;
 
`;

const RadioButton = styled.input`
  margin-right: 10px;
  margin-top: -15px;
`;

// const RadioButtonTitle = styled.div`
//   font-weight: 600;
// `;
const Title = styled.h4`
    color: ${colors.black};
`;
const Description = styled.div`
  margin-top: 5px;
`;



