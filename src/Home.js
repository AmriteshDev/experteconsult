import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CreateUser from './Components/CreateUser';

const Home = () => {
    const [list, setList] = useState([]);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [optionPosition, setOptionPosition] = useState({ top: 0, left: 0 });
    const optionsRefs = useRef([]);

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        optionsRefs.current = optionsRefs.current.slice(0, list.length);
    }, [list]);

    const getList = async () => {
        try {
            let ProfileData = localStorage.getItem('ProfileData');
            ProfileData = JSON.parse(ProfileData);
            var request = {
                AdminID: ProfileData.AdminID,
                SessionID: ProfileData.SessionID,
                Skip: 0,
                Limit: 100,
                Whether_Status_Filter: false,
                Status: true,
                Whether_Search_Filter: false,
            }
            const response = await axios.post('https://api.experteconsult.com/admin/Fetch_All_Admin_Users', request);
            setList(response.data.extras.Data);
        } catch (error) {
            console.log('user fetching error ===>>> ', error.message)
        }
    };

    const toggleOptions = (index, buttonRef) => {
        if (selectedOptionIndex === index) {
            setSelectedOptionIndex(null);
        } else {
            setSelectedOptionIndex(index);
            const buttonRect = buttonRef.current.getBoundingClientRect();
            setOptionPosition({
                top: buttonRect.bottom
            });
        }
    };

    const handleClickOutside = (event) => {
        if (optionsRefs.current.every(ref => ref.current && !ref.current.contains(event.target))) {
            setSelectedOptionIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container>
            <HomeWrapper>
                <HomeRow>
                    <HomeCell flex={0.3} backgroundColor="#f7f7f7" borderTopLeftRadius="4px">S.no</HomeCell>
                    <HomeCell flex={1} backgroundColor="#f7f7f7">Name</HomeCell>
                    <HomeCell flex={1} backgroundColor="#f7f7f7">Phone</HomeCell>
                    <HomeCell flex={1} backgroundColor="#f7f7f7">Email</HomeCell>
                    <HomeCell flex={0.4} backgroundColor="#f7f7f7">Type</HomeCell>
                    <HomeCell flex={0.3} backgroundColor="#f7f7f7" borderTopRightRadius="4px">Status</HomeCell>
                    <HomeCell flex={0.3} backgroundColor="#f7f7f7" borderTopRightRadius="4px">Action</HomeCell>
                </HomeRow>

                {list.map((item, index) => {
                    optionsRefs.current[index] = optionsRefs.current[index] || React.createRef();
                    return (
                        <HomeRow key={index}>
                            <HomeCell flex={0.3} backgroundColor="#fff">{index + 1}</HomeCell>
                            <HomeCell flex={1} backgroundColor="#fff">{item.Name}</HomeCell>
                            <HomeCell flex={1} backgroundColor="#fff">{item.PhoneNumber}</HomeCell>
                            <HomeCell flex={1} backgroundColor="#fff">{item.EmailID}</HomeCell>
                            <HomeCell flex={0.4} backgroundColor="#fff">{item.Role_Type}</HomeCell>
                            <HomeCell flex={0.3} backgroundColor="#fff">{item.status ? 'Active' : 'Inactive'} </HomeCell>
                            <HomeCell flex={0.3} backgroundColor="#fff">
                                <Button ref={optionsRefs.current[index]} onClick={() => toggleOptions(index, optionsRefs.current[index])}>{"..."}</Button>
                                {selectedOptionIndex === index && (
                                    <OptionsWrapper style={{ top: optionPosition.top }}>
                                        <Option onClick={() => { }}>Update</Option>
                                        <Option onClick={() => console.log('clicked on ..')}>{item.Status ? "Inactive" : "Active"}</Option>
                                    </OptionsWrapper>
                                )}
                            </HomeCell>
                        </HomeRow>
                    );
                })}
            </HomeWrapper>
            <CreateUser />
        </Container>
    );
};

export default Home;

const OptionsWrapper = styled.div`
    position: absolute;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-direction: column; 
    right: calc(30% + 55px);
`
const Option = styled.div`
    padding: 8px;
    cursor: pointer;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const HomeWrapper = styled.div`
  width: 70%;
`;

const HomeRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3%;
`;

const HomeCell = styled.div`
  flex: ${props => props.flex || 'initial'};
  text-align: left;
  background-color: ${props => props.backgroundColor || '#fff'};
  padding-top: 5px;
  padding-bottom: 5px;
  border-top-left-radius: ${props => props.borderTopLeftRadius || 0};
  border-top-right-radius: ${props => props.borderTopRightRadius || 0};
`;

const Button = styled.button`
  margin-left: 5px;
  background-color: white;
  color: black;
  transform: rotate(90deg);
  border: none;
  cursor: pointer;
`;