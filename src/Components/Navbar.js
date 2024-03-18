import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '../assets/images/logo.webp';
import { TbLogout } from "react-icons/tb";
import { fetchPostData } from '../helper/helper';

const Navbar = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); // State to store selected client details
  const ProfileData = JSON.parse(localStorage.getItem('ProfileData')) || {};

  const logOut = () => {
    localStorage.removeItem("ProfileData");
    window.location.href = "/"; // Redirect to the home page
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    localStorage.setItem("selectedClientData", client)
    if (client) {
      navigate('/client')
    } else {
      navigate('')
    }
  };

  const fetchClientData = () => {
    const request = {
      "Skip": 0,
      "Limit": 10,
      "Whether_Status_Filter": false,
      "Status": false,
      "Whether_Search_Filter": false,
      "Search": ""
    };

    fetchPostData('/Filter_All_Clients', request)
      .then(response => {
        if (response.success && response.extras?.Data) {
          setClientList(response.extras.Data);
        }
      })
      .catch(error => {
        console.log('Error fetching client data:', error);
      });
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return (
    <NavbarContainer>
      <LogoWrapper>
        <Logo><img width={40} height={40} src={LogoIcon} alt='experteconsult' /></Logo>
        <ClientSelect>
          <select onChange={(e) => handleClientSelect(e.target.value)}>
            <option value="">Select Client</option>
            {clientList.map(client => (
              <option key={client.ClientID} value={JSON.stringify(client)}>{client.EmailID}</option>
            ))}
          </select>
        </ClientSelect>
      </LogoWrapper>
      <NavItems>
        {ProfileData && selectedClient &&
          <>
            {selectedClient ?
              <NavItem to="/client">Clients</NavItem>
              :
              <>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/client">Clients</NavItem>
              </>
            }
            <NavItem to="/banner">Banner</NavItem>
            <NavItem to="/meeting">Meeting</NavItem>
            <NavItem to="/payment">Payment</NavItem>
            <NavItem to="/booking">Booking</NavItem>
            <NavItem to="/documents">Documents</NavItem>
            <NavItem to="/customers">Customers</NavItem>
            <NavItem to="/contact">Contact Me</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem onClick={() => setSelectedClient(null)} to="/">Back to admin</NavItem>
          </>
        }
        <div onClick={logOut}><TbLogout style={{ color: "red", cursor: 'pointer' }} /></div>
      </NavItems>
    </NavbarContainer>
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
				`;

const Logo = styled.div`
				font-size: 24px;
				`;

const ClientSelect = styled.div`
				select {
					width: 200px;
				height: 30px;
	}
				`;

const NavItems = styled.div`
				display: flex;
				`;

const NavItem = styled(Link)`
				margin-right: 20px;
				text-decoration: none;
				color: ${props => props.theme.white};
				&:hover {
					color: ${props => props.theme.accent};
	}
				`;