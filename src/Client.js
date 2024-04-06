import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import BasicInfo from './Components/BasicInfo';
import MultiStep from 'react-multistep';
import TermForm from './Components/TermForm';
import LayoutInputForm from './Components/LayoutInputForm';
import Layout from './Components/Layout';
import Links from './Components/Links';
import BookingManagement from './Components/BookingManagement';
import AboutUs from './Components/AboutUs';
import colors from '../src/Components/colors';
import { useParams } from 'react-router-dom';

export default function Client(props) {

  const [selectedClientData, setSelectedClientData] = useState(null);
  const { ClientID } = useParams();
  const multiStepRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem('selectedClientData');
    if (data && data != 'undefined') {
      setSelectedClientData(JSON.parse(data));
    }
  }, [ClientID]);

  const steps = [
    { title: 'Basic Info', component: <BasicInfo selectedClientData={selectedClientData} /> },
    { title: 'Layout', component: <Layout selectedClientData={selectedClientData} /> },
    { title: 'Input', component: <LayoutInputForm selectedClientData={selectedClientData} /> },
    { title: 'Links', component: <Links selectedClientData={selectedClientData} /> },
    { title: 'Booking', component: <BookingManagement selectedClientData={selectedClientData} /> },
    { title: 'Terms', component: <TermForm selectedClientData={selectedClientData} /> },
    { title: 'About Us', component: <AboutUs selectedClientData={selectedClientData} /> },
  ];

  return (
    <Container>
      <ContentWrapper>
        <LeftContainer>
          {selectedClientData !== null ?
            <MultiStep
              ref={multiStepRef}
              prevButton={{
                title: 'Back', style: {
                  background: "#cd3b3bed",
                  padding: "10px 20px",
                  fontSize: "15px",
                  color: "white",
                  borderRadius: "25px",
                  border: "none",
                  cursor: 'pointer'
                }
              }}
              nextButton={{
                title: 'Next',
                style: {
                  background: '#08c3ff',
                  borderRadius: "25px",
                  padding: "10px 20px",
                  fontSize: "15px",
                  color: "white",
                  border: "none",
                  position: 'absolute',
                  right: '22%',
                  cursor: 'pointer'
                }
              }}
              activeStep={0}
              showNavigation={true}
              steps={steps}
            />
            : (
              <Message>Select a user</Message>
            )}
        </LeftContainer>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LeftContainer = styled.div`

  padding: 35px;
  width: 60%;
  .go2392553372{
    display: block;
    flex-direction: row;
    overflow-x: auto;
  }
  .go169520481{
    flex-direction: column;
  }
  .go3842760039:before{
    margin-top: 3px;
  }
  .go2335061104:before{
    margin-top: 3px;
  }
  .go433304200:before{
    margin-top: 3px;
  }
  .button{
    background: red;
    position: absolute;
    right: 0px;

  }
  .go2150698616 span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
    font-weight: 600;
    }

    .go2150698616 {
      display: inline-block;
      text-align: center;
      line-height: 4.8rem;
      padding: 0 0.6rem;
      cursor: pointer;
      min-width: 0rem;
      color: ${colors.gray};
      border-bottom: 2px solid #6842ef;
    }
`;

const Message = styled.div`
  font-size: 18px;
  color: red;
  text-align: center;
`;
