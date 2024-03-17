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



const steps = [
  { title: 'Basic Info', component: <BasicInfo /> },
  { title: 'Layout', component: <Layout /> },
  { title: 'Input', component: <LayoutInputForm /> },
  { title: 'Links', component: <Links /> },
  { title: 'Payment', component: <Payment /> },
  { title: 'Booking', component: <BookingManagement /> },
  { title: 'Pricing', component: <Pricing /> },
  { title: 'Terms', component: <TermForm /> },
  { title: 'Customers', component: <TermForm /> },
  { title: 'About Us', component: <TermForm /> },
  { title: 'Contact Us', component: <TermForm /> },

];

export default function Client() {
  return (
    <Container>
      <ContentWrapper>
        <LeftContainer>
          <MultiStep
            prevButton={{ title: 'Back', style: { background: 'red' } }}
            nextButton={{ title: 'Next', style: { background: 'green' } }}
            activeStep={1}
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
  
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 20px;
`;