import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '../assets/images/logo.webp'
import { TbLogout } from "react-icons/tb";

const Navbar = () => {

	const logOut = () => {
		localStorage.removeItem("ProfileData")
		window.location.href = "/"
	}

	return (
		<NavbarContainer>
			<Logo><img width={40} height={40} src={LogoIcon} alt='experteconsult' /></Logo>
			<NavItems>
				<NavItem to="/">Home</NavItem>
				<NavItem to="/client">Clients</NavItem>
				<NavItem to="/banner">Banner</NavItem>
				<NavItem to="/meeting">Meeting</NavItem>
				<NavItem to="/payment">Payment</NavItem>
				<NavItem to="/booking">Booking</NavItem>
				<NavItem to="/documents">Documents</NavItem>
				<NavItem to="/customers">Customers</NavItem>
				<NavItem to="/contact">Contact Me</NavItem>
				<NavItem to="/about">About Us</NavItem>
				<div onClick={() => logOut()}><TbLogout style={{ color: "red", cursor: 'pointer' }} /></div>
			</NavItems>

		</NavbarContainer>
	);
};

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


export default Navbar;
