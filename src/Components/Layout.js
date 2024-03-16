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
                        <div>
                            <Checkbox id={""} />
                            <h3>Layout {item}</h3>
                        </div>
                        <LayoutBox item={item} />
                    </LayoutItem>
                ))}
            </LayoutContainer>
            <Button onClick={() => { setTab(2) }}>Save</Button>
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
`;

const Title = styled.h1`
  color: ${colors.black};
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

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  /* Your checkbox styles here */
`;

const LayoutBox = styled.div`
  width: 50%;
  height: 220px;
  background-color: ${({ item }) => (item === 1 ? 'red' : 'blue')};
  border: 0.2px solid gray;
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

