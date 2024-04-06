import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import colors from './colors';
import { toast } from 'react-toastify';
import { fetchPostData } from '../helper/helper';
import BookingPopup from './BookingPopup';
import { Button, Table } from 'reactstrap';

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
      <Table responsive bordered className='dark-table'>
        <thead>
          <tr className='text-center py-1'>
            <th colSpan={3} className='h4'>Booking Management</th>
            <th colSpan={2}>
              <div>
                <Button className="btn btn-color-success btn-radus-padding" onClick={() => setIsOpen(true)}>Create Booking</Button>
              </div>
            </th>
          </tr>
          <tr className='text-center'>
            <th>S.no</th>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bookings && bookings.map((item, index) => {
            return (
              <tr key={index}>
                <td className='text-center'>{(index + 1)}</td>
                <td>{item.Client_Booking_ManagmentID}</td>
                <td>{item.Title}</td>
                <td>{item.Status}</td>
                <td >
                  <Button onClick={(e) => handleUpdateBooking(item.Client_Booking_ManagmentID)}>Edit</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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