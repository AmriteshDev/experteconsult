import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';

export default function CheckBox({ initialValue, title, description, onChange }) {
  const [checked, setChecked] = useState(initialValue);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked)
    onChange(event.target.checked);
  };

  return (
    <CheckBoxContainer>
      <CheckBoxWrapper>
        <CheckBoxStyle
          id={title}
          type='checkbox'
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor={title}>{title}</Label>
      </CheckBoxWrapper>
      {description && <Description>{description}</Description>}
    </CheckBoxContainer>
  );
}

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${colors.white};
  margin-bottom: 10px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
`;

const CheckBoxStyle = styled.input`
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
  color: ${colors.black};
  font-weight: 600;
  cursor: pointer;
`;

const Description = styled.div`
  margin-top: 7px;
  margin-left: 5px;
`;