import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CreateUser from './Components/CreateUser';
import { fetchPostData } from './helper/helper';

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

            var request = {
                Skip: 0,
                Limit: 100,
                Whether_Status_Filter: false,
                Status: true,
                Whether_Search_Filter: false,
            }
            const response = await fetchPostData('/Fetch_All_Admin_Users', request);
            if (response.success) {
                setList(response.extras.Data);
            }
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
                <TableContainer>
                    <HomeRow>
                        <HomeCell flex={0.3}>S.no</HomeCell>
                        <HomeCell flex={1}>Name</HomeCell>
                        <HomeCell flex={1}>Phone</HomeCell>
                        <HomeCell flex={1}>Email</HomeCell>
                        <HomeCell flex={0.4}>Type</HomeCell>
                        <HomeCell flex={0.3}>Status</HomeCell>
                        <HomeCell flex={0.3}>Action</HomeCell>
                    </HomeRow>

                    {list.map((item, index) => {
                        optionsRefs.current[index] = optionsRefs.current[index] || React.createRef();
                        return (
                            <HomeRow key={index}>
                                <HomeCell flex={0.3}>{index + 1}</HomeCell>
                                <HomeCell flex={1}>{item.Name}</HomeCell>
                                <HomeCell flex={1}>{item.PhoneNumber}</HomeCell>
                                <HomeCell flex={1}>{item.EmailID}</HomeCell>
                                <HomeCell flex={0.4}>{item.Role_Type}</HomeCell>
                                <HomeCell flex={0.3}>{item.status ? 'Active' : 'Inactive'} </HomeCell>
                                <HomeCell flex={0.3}>
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
                </TableContainer>
            </HomeWrapper>
            <CreateUser />
        </Container>
    );
};

export default Home;

// const OptionsWrapper = styled.div`
//     position: absolute;
//     z-index: 1;
//     background-color: #fff;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     flex-direction: column; 
//     right: calc(30% + 55px);
// `

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const HomeWrapper = styled.div`
  width: 70%;
`;

// const HomeRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin: 3%;
// `;

// const HomeCell = styled.div`
//   flex: ${props => props.flex || 'initial'};
//   text-align: left;
//   background-color: ${props => props.backgroundColor || '#fff'};
//   padding-top: 5px;
//   padding-bottom: 5px;
// `;

// const Button = styled.button`
//   margin-left: 5px;
//   background-color: white;
//   color: black;
//   transform: rotate(90deg);
//   border: none;
//   cursor: pointer;
// `;

const TableContainer = styled.div`
    width: 95%;
    margin: 20px auto;
    align-items: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;




// const TableContainer = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   overflow: hidden;
// `;

const HomeRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;

const HomeCell = styled.div`
  flex: ${props => props.flex};
  padding: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: calc(100% - 150px);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
`;

const Option = styled.div`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;