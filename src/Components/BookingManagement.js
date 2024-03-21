import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import colors from './colors';
import { toast } from 'react-toastify';
import { fetchPostData } from '../helper/helper';
import BookingPopup from './BookingPopup';

const BookingManagement = ({ selectedClientData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [createBookingFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const [onClose, setOnClose] = useState(false)


  const bookingDetails = ["Id", "Name", "Phone", "Email", "Status", "Type"];
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };



  const handleCreateBooking = (e) => {
    e.preventDefault();

    const request = {
      Title: createBookingFormData.Title,
      Description: createBookingFormData.Description,
      ClientID: createBookingFormData.ClientID,
      Option: createBookingFormData.Option,
      Name: createBookingFormData.Name,
      EmailID: createBookingFormData.EmailID,
      PhoneNumber: createBookingFormData.PhoneNumber,
    };

    fetchPostData('/Book_Meeting', request)
      .then(response => {
        if (response.success) {
          toast.success(response.extras.Status || 'Added Successfully');
          console.log("request===>", response)
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.extras.msg || 'something went wrong');
      });
  };




  return (
    <>
      <Container>
        <Title>Booking Management</Title>
        <TableContainer>
          <TableRow>
            <TableHeaderCell flex={0.3} borderRadius="top-left"><Text>S.no</Text></TableHeaderCell>
            <TableHeaderCell flex={0.4}><Text>Id</Text></TableHeaderCell>
            <TableHeaderCell flex={1}><Text>Name</Text></TableHeaderCell>
            <TableHeaderCell flex={1}><Text>Phone</Text></TableHeaderCell>
            <TableHeaderCell flex={1}><Text>Email</Text></TableHeaderCell>
            <TableHeaderCell flex={0.4}><Text>Type</Text></TableHeaderCell>
            <TableHeaderCell flex={0.3} borderRadius="top-right"><Text>Status</Text></TableHeaderCell>
          </TableRow>
          {/* {
          bookingDetails && bookingDetails.map((item, index) => (
            <div key={index}>
              <div>{item.index + 1}</div>
              <div>{item.Id}</div>
              <div>{item.Name}</div>
              <div>{item.Phone}</div>
              <div>{item.Email}</div>
              <div>{item.Type}</div>
              <div>{item.Status}</div>
            </div>
          ))
        } */}
          <TableFooter />
        </TableContainer>

        <Button onClick={() => setIsOpen(true)}>Create Booking</Button>
      </Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
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
        <BookingPopup closePopup={() => setIsOpen(false)} isPopupOpen={isPopupOpen} handleCreateBooking={handleCreateBooking} />
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