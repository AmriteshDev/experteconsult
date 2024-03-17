import React from 'react';
import styled from 'styled-components';
import colors from './colors';

export default function Layout({ setTab }) {
  const data = [1, 2];
  return (
    <Container>
      <Title>Select Layout</Title>
      <LayoutContainer>
        {data.map((item) => (
          <LayoutItem key={item}>
            <CheckboxLabel htmlFor={`layout${item}`}>
              <Checkbox id={`layout${item}`} type="checkbox" />
              <LabelText>Layout {item}</LabelText>
            </CheckboxLabel>
            <LayoutBox item={item} />
          </LayoutItem>
        ))}
      </LayoutContainer>
      <SaveButton onClick={() => { setTab(2) }}>Save</SaveButton>
    </Container>
  );
}

const Container = styled.div`
    width: 95%;
    align-self: center;
    margin-top: 20px;
    align-items: center;
    flex-direction: column;
    display: flex;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: ${colors.black};
    margin-bottom: 20px;
`;

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    `;

const LayoutItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: space-around;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const LabelText = styled.span`
    color: ${colors.black};
`;

const LayoutBox = styled.div`
    width: 50%;
    height: 220px;
    background-color: ${({ item }) => (item === 1 ? "red" : "blue")};
    border: 0.2px solid gray;
`;

const SaveButton = styled.button`
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
`;

