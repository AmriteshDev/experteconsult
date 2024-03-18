import React from 'react';
import styled from 'styled-components';
import BasicInfo from './Components/BasicInfo';
import Payment from './Components/Payment';
import MultiStep from 'react-multistep';
import TermForm from './Components/TermForm';
import LayoutInputForm from './Components/LayoutInputForm';
import Layout from './Components/Layout';
import Links from './Components/Links';
import BookingManagement from './Components/BookingManagement';
import Pricing from './Components/Pricing';

let selectedClientData = localStorage.getItem("selectedClientData");
selectedClientData = JSON.parse(selectedClientData);
console.log("selectedClientData====>", selectedClientData)

const steps = [
  { title: 'Basic Info', component: <BasicInfo selectedClientData={selectedClientData} /> },
  { title: 'Layout', component: <Layout selectedClientData={selectedClientData} /> },
  { title: 'Input', component: <LayoutInputForm selectedClientData={selectedClientData} /> },
  { title: 'Links', component: <Links selectedClientData={selectedClientData} /> },
  { title: 'Payment', component: <Payment selectedClientData={selectedClientData} /> },
  { title: 'Booking', component: <BookingManagement selectedClientData={selectedClientData} /> },
  { title: 'Pricing', component: <Pricing selectedClientData={selectedClientData} /> },
  { title: 'Terms', component: <TermForm selectedClientData={selectedClientData} /> },
  { title: 'Customers', component: <TermForm selectedClientData={selectedClientData} /> },
  { title: 'About Us', component: <TermForm selectedClientData={selectedClientData} /> },
  { title: 'Contact Us', component: <TermForm selectedClientData={selectedClientData} /> },

];

export default function Client() {


  return (
    <Container>
      <ContentWrapper>
        <LeftContainer>
          <MultiStep
            prevButton={{ title: 'Back', style: { background: 'red' }  }}
            nextButton={{ title: 'Next', style: { background: 'green' } }}
            activeStep={0}
            showNavigation={true}
            steps={steps}
          /> </LeftContainer>
        {/* <RightContainer>

          <p>Form Information</p>
        </RightContainer> */}
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
  flex: 1;
  padding: 20px;
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
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 20px;
`;