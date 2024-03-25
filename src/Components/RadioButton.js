import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';

export default function RadioButton({ name, initialValue, labelName, handleRadioButton }) {
    const [checked, setChecked] = useState(initialValue);

    const handleChange = (event) => {
        const value = event.target.value;
        setChecked(value);
        handleRadioButton(value);
    };

    return (
        <RadioButtonContainer>
            <RadioButtonWrapper>
                {labelName.map((item, index) => (
                    <Label key={index}>
                        <RadioButtonStyle
                            type='radio'
                            name={name}
                            value={index + 1}
                            checked={checked.toString() === `${index + 1}`}
                            onChange={handleChange}
                        />
                        {item}
                    </Label>
                ))}
            </RadioButtonWrapper>
        </RadioButtonContainer>
    );
}

const RadioButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${colors.white};
`;

const RadioButtonWrapper = styled.div`
    display: flex;
    cursor: pointer;
`;

const RadioButtonStyle = styled.input`
    margin-right: 10px;
    cursor: pointer;
    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
    &:hover {
        border-color: ${colors.primary};
    }
`;

const Label = styled.label`
    cursor: pointer;
`;