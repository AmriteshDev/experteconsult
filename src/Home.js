import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
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

    const handleStatus = async (status, Selected_AdminID) => {

        console.log('status ===>>> ', status, 'sleted ===>> ', Selected_AdminID)
        try {

            let URLs = status ? '/Inactivate_Admin' : '/Activate_Admin'

            const response = await fetchPostData(URLs, { Selected_AdminID });
            if (response.success) {
                console.log('response ===>>> ', response)
            }
        } catch (error) {
            console.log('user fetching error ===>>> ', error.message)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container>
            <TableWrapper>
                <TableContainer>
                    <TableRowHeading>
                        <HeadingCell flex={0.2}>S.no</HeadingCell>
                        <HeadingCell flex={1}>Name</HeadingCell>
                        <HeadingCell flex={1}>Phone</HeadingCell>
                        <HeadingCell flex={1}>Email</HeadingCell>
                        <HeadingCell flex={0.3}>Type</HeadingCell>
                        <HeadingCell flex={0.2}>Status</HeadingCell>
                        <HeadingCell flex={0.2}>Edit</HeadingCell>
                    </TableRowHeading>

                    {list.map((item, index) => {
                        optionsRefs.current[index] = optionsRefs.current[index] || React.createRef();
                        return (
                            <TableRow key={index}>
                                <TableDataCell flex={0.2}>{index + 1}</TableDataCell>
                                <TableDataCell flex={1}>{item.Name}</TableDataCell>
                                <TableDataCell flex={1}>{item.PhoneNumber}</TableDataCell>
                                <TableDataCell flex={1}>{item.EmailID}</TableDataCell>
                                <TableDataCell flex={0.3}>{item.Role_Type}</TableDataCell>
                                <TableDataCell flex={0.2} className={item.Status ? "inActive" : "active"} onClick={() => handleStatus(item.Status, item.AdminID)}>{item.Status ? 'Active' : 'Inactive'} </TableDataCell>
                                <TableDataCell flex={0.2}>
                                    Update
                                </TableDataCell>
                            </TableRow>
                        );
                    })}
                </TableContainer>
            </TableWrapper>
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const TableWrapper = styled.div`
  width: 70%;
`;

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

const TableRowHeading = styled.div`
  display: flex;
  border-bottom: 2px solid black;
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;


const TableDataCell = styled.div`
  flex: ${props => props.flex};
  padding: 10px;
`;

const HeadingCell = styled.div`
  flex: ${props => props.flex};
  padding: 10px;
  font-color:black;
  font-weight:600
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Option = styled.div`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
  &.acitve{
    cursor: pointer;
  }
  &.inActive{
    cursor: pointer;
    color: red;
  }
`;