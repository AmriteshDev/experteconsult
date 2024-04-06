import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '../assets/images/logo.webp';
import { TbLogout } from "react-icons/tb";
import { fetchPostData } from '../helper/helper';
import colors from './colors';

const Navbar = () => {

  const { ClientId } = useParams();
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("ProfileData");
    localStorage.removeItem("selectedClientData");
    window.location.href = "/";
  };

  const handleClientSelect = (clientId) => {
    const client = clientList.find(client => client.ClientID === clientId);
    setSelectedClient(client);
    localStorage.setItem('selectedClientData', JSON.stringify(client));
    if (clientId) {
      navigate(`/client/${clientId}`);
    } else {
      navigate(`/`);
    }
  };

  const fetchClientData = async () => {
    const request = {
      "Skip": 0,
      "Limit": 10,
      "Whether_Status_Filter": false,
      "Status": false,
      "Whether_Search_Filter": false,
      "Search": ""
    };

    try {
      const response = await fetchPostData('/Filter_All_Clients', request);
      if (response.success && response.extras?.Data) {
        return response.extras.Data;
      }
    } catch (error) {
      console.log('Error fetching client data:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchClientData().then(clientDetail => {
      setClientList(clientDetail);
    });
  }, []);

  useEffect(() => {
    if (ClientId) {
      const client = clientList.find(client => client.ClientID === ClientId);
      setSelectedClient(client);
    }
  }, [ClientId, clientList]);

  const gotoHome = () => {
    navigate('/');
  };

  return (
    <>
      <NavbarContainer>
        <LogoWrapper>
          <Logo onClick={gotoHome}><img width={120} height={30} src={LogoIcon} alt='experteconsult' /></Logo>
          <ClientSelect>
            <Select value={selectedClient ? selectedClient.ClientID : ""} onChange={(e) => handleClientSelect(e.target.value)}>
              <option value="">Select Client</option>
              {clientList.map(client => (
                <option key={client.ClientID} value={client.ClientID}>{client.EmailID}</option>
              ))}
            </Select>

          </ClientSelect>
        </LogoWrapper>
        <NavItems>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/banner">Banner</NavItem>
          <NavItem to="/meeting">Meeting</NavItem>
          <NavItem to="/payment">Payment</NavItem>
          <NavItem to="/booking">Booking</NavItem>
          <NavItem to="/documents">Documents</NavItem>
          <NavItem to="/customers">Customers</NavItem>
          <NavItem to="/contact">Contact Me</NavItem>
          <NavItem to="/about">About Us</NavItem>
          <div onClick={logOut}><TbLogout style={{ color: "red", cursor: 'pointer' }} /></div>
        </NavItems>
      </NavbarContainer>
    </>
  );
};

export default Navbar;

const LogoWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  padding: 10px 20px;
  background: #471aa040;
`;

const Logo = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const ClientSelect = styled.div`
  select {
    width: 230px;
  }
`;

const NavItems = styled.div`
	display: flex;
`;

const NavItem = styled(Link)`
  margin-right: 20px;
  text-decoration: none;
  font-weight: bold;
  font-family: serif;
  color: ${props => props.theme.white};
  &:hover {
    color: ${props => props.theme.accent};
	}
`;

const Select = styled.select`
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
    &:focus {
        outline: none; 
        border-color: ${colors.primary}; 
    }
    &:hover {
        border-color: ${colors.primary}; 
    }
    margin-right: 10px;
   `;
