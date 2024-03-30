import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';

const data = [1, 2];

export default function Layout({ selectedClientData }) {
  const [selectedLayout, setSelectedLayout] = useState(selectedClientData.Layout_Type || 1);

  useEffect(() => {
    setSelectedLayout(selectedClientData.Layout_Type || 1);
  }, [selectedClientData])

  const handleLayoutChange = (item) => {
    setSelectedLayout(item);
  };

  const handleSave = () => {
    const request = {
      ClientID: selectedClientData.ClientID,
      Layout_Type: selectedLayout
    }

    fetchPostData('/Update_Client_Layout', request)
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
      <Title>Select Layout</Title>
      <LayoutContainer>
        {data.map((item) => (
          <LayoutItem key={item}>
            <RadioLabel htmlFor={`layout${item}`}>
              <Radio
                id={`layout${item}`}
                type="radio"
                name="layout"
                checked={selectedLayout === item}
                onChange={() => handleLayoutChange(item)}
              />
              <LabelText>Layout {item}</LabelText>
            </RadioLabel>
            {/* <LayoutBox item={item} /> */}
          </LayoutItem>
        ))}
      </LayoutContainer>
      <SaveButton onClick={handleSave}>Save</SaveButton>
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  align-self: center;
  margin: 20px auto;
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
`;

const LayoutContainer = styled.div`
display: flex;
width: 100%;
margin-top: 20px;
`;

const LayoutItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Radio = styled.input`
  margin-right: 10px;
`;

const LabelText = styled.span`
  color: ${colors.black};
`;

const LayoutBox = styled.div`
  width: 50%;
  height: 220px;
  background-color: ${({ item }) => (item === 1 ? 'red' : 'blue')};
  border: 0.2px solid gray;
`;

const SaveButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  max-width: 150px;
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;
