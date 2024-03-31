import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import colors from './colors';
import { toast } from 'react-toastify';
import { fetchPostData } from '../helper/helper';
import BookingPopup from './BookingPopup';

const BookingManagement = ({ selectedClientData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState([])

  useEffect(() => {
    const request = {
      "ClientID": selectedClientData.ClientID,
      "Skip": 0,
      "Limit": 10,
      "Whether_Status_Filter": false,
      "Status": false,
      "Whether_Search_Filter": false,
      "Search": ""
    }
    fetchPostData('/Filter_All_Client_Booking_Managements', request)
      .then(response => {
        if (response.success) {
          setBookings(response.extras.Data)
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.extras.msg || 'something went wrong');
      });
  }, [])

  const handleUpdateBooking = (booking_id) => {
    const selectedBooking = bookings.filter((item) => item.Client_Booking_ManagmentID === booking_id)
    setSelectedBooking(selectedBooking)
    setIsOpen(true)
  };


  return (
    <>
      <Container>
        <Title>Booking Management</Title>
        <TableContainer>
          <TableRow>
            <TableHeaderCell flex={0.3} borderRadius="top-left"><Text>S.no</Text></TableHeaderCell>
            <TableHeaderCell flex={0.4}><Text>Id</Text></TableHeaderCell>
            <TableHeaderCell flex={1}><Text>Title</Text></TableHeaderCell>
            <TableHeaderCell flex={0.3} borderRadius="top-right"><Text>Status</Text></TableHeaderCell>
            <TableHeaderCell flex={0.3} borderRadius="top-right"><Text>Action</Text></TableHeaderCell>
          </TableRow>
          {
            bookings && bookings.map((item, index) => (
              <TableRow key={index}>
                <TableColumnCell>{index + 1}</TableColumnCell>
                <TableColumnCell>{item.Client_Booking_ManagmentID || ''}</TableColumnCell>
                <TableColumnCell>{item.Title || ''}</TableColumnCell>
                <TableColumnCell>{item.Status || ''}</TableColumnCell>
                <TableColumnCell><button onClick={(e) => handleUpdateBooking(item.Client_Booking_ManagmentID)}>Edit</button></TableColumnCell>
              </TableRow>
            ))
          }
          <TableFooter />
        </TableContainer>

        <Button onClick={() => setIsOpen(true)}>Create Booking</Button>
      </Container>
      <Modal
        isOpen={isOpen}
        // onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        contentLabel="Max Width Popup"
        style={{
          content: {
            maxWidth: '75%',
            margin: 'auto',
            backgroundColor: '#f7f7f7',
          },
        }}
      >
        <BookingPopup setIsOpen={setIsOpen} selectedBooking={selectedBooking} selectedClientData={selectedClientData} />
      </Modal>
    </>
  );
};

export default BookingManagement;

const Container = styled.div`
width: 95%;
margin: 20px auto;
align-items: center;
flex-direction: column;
display: flex;
background-color: #f5f5f5;
padding: 20px;
border-radius: 8px;
box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableHeaderCell = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TableColumnCell = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TableFooter = styled.div`
  background-color: #f7f7f7;
  height: 18px;
  margin-left: 3%;
  margin-right: 3%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Text = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
background-color: ${colors.primary};
  color: ${colors.white};
  max-width: 150px;
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  `;

const Title = styled.h1`
  color: ${colors.black};
  align-self: center;
`;