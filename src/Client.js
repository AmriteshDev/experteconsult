import React, { useState } from 'react';
import styled from 'styled-components';
import BasicInfo from './Components/BasicInfo';
import Layout from './Components/Layout';
import LayoutInputForm from './Components/LayoutInputForm';
import Links from './Components/Links';
import Payment from './Components/Payment';
import BookingManagement from './Components/BookingManagement';
import Priceing from './Components/Priceing';
import TermForm from './Components/TermForm';


export default function Client() {

    const [innerTab, setInnerTab] = useState(0)

    const setTabValue = (value) => {
        setInnerTab(value)
    }

    return (
        <TabContainer>
            <TabRow>
                <SelectedTab onClick={() => { setInnerTab(0) }}>Basic Info</SelectedTab>
                <UnselectedTab onClick={() => { setInnerTab(1) }}>Layout</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(2) }}>Input</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(3) }}>Links</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(4) }}>Payment</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(5) }}>Bookings</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(6) }}>Pricing</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(7) }}>Terms</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(8) }}>Customers</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(9) }}>About Us</UnselectedTab>
                <UnselectedTab onClick={() => { setInnerTab(10) }}>Contact Us</UnselectedTab>
            </TabRow>
            {innerTab === 0 && <BasicInfo setTab={setTabValue} />}
            {innerTab === 1 && <Layout setTab={setTabValue} />}
            {innerTab === 2 && <LayoutInputForm setTab={setTabValue} />}
            {innerTab === 3 && <Links setTab={setTabValue} />}
            {innerTab === 4 && <Payment setTab={setTabValue} />}
            {innerTab === 5 && <BookingManagement setTab={setTabValue} />}
            {innerTab === 6 && <Priceing setTab={setTabValue} />}
            {innerTab === 7 && <TermForm />}
            {innerTab === 8 && <TermForm />}
            {innerTab === 9 && <TermForm />}
            {innerTab === 10 && <TermForm />}
        </TabContainer>
    )
}


const TabContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const TabRow = styled.div`
    flex-direction: row;
    display: flex;
    width: 95%;
    align-self: center;
    
    margin-top: 3%;

`;

const SelectedTab = styled.div`
    flex: 1;
    align-items: center;
    text-align: center;
    padding-bottom: 5px;
    padding-top: 5px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.white};
`;

const UnselectedTab = styled.div`
    align-items: center;
    border-width: 0.5px;
    padding-top: 5px;
    opacity: 0.5;
    padding-bottom: 5px;
    border-style: solid;
    flex: 1;
    color: ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.gray};
`;

