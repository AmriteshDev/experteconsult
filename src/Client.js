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
import Customers from './Components/Customers';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';

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
  { title: 'Customers', component: <Customers selectedClientData={selectedClientData} /> },
  { title: 'About Us', component: <AboutUs selectedClientData={selectedClientData} /> },
  { title: 'Contact Us', component: <ContactUs selectedClientData={selectedClientData} /> },

];

export default function Client() {


  return (
    <Container>
      <ContentWrapper>
        <LeftContainer>
          <MultiStep
            prevButton={{
              title: 'Back', style: {
                background: "#cd3b3bed",
                position: "absolute",
                left: "30px",
                padding: "10px 24px",
                fontSize: "15px",
                color: "white",


              }
            }}
            nextButton={{
              title: 'Next', style: {
                background: '#08c3ff',
                position: "absolute",
                right: "30px",
                padding: "10px 24px",
                fontSize: "15px",
                color: "white"
              }
            }}
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
  .button{
    background: red;
    position: absolute;
    right: 0px;

  }
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 20px;
`;