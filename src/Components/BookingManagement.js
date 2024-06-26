import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import colors from './colors';
import { toast } from 'react-toastify';
import { fetchPostData } from '../helper/helper';

const BookingManagement = ({ selectedClientData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [createBookingFormData, setCreateBookingFormData] = useState({
    Title: "",
    Description: "",
    ClientID: selectedClientData.ClientID,
  });

  const bookingDetails = ["Id", "Name", "Phone", "Email", "Status", "Type"];
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleBooking = (key, value) => {
    setCreateBookingFormData({
      ...createBookingFormData,
      [key]: value
    });
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();

    const request = {
      Title: createBookingFormData.Title,
      Description: createBookingFormData.Description,
      ClientID: createBookingFormData.ClientID,
    };

    fetchPostData('/Create_Client_Booking_Management', request)
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



  const options = [{ value: 'option1', title: 'Option 1', description: 'Description for Option 1' }, { value: 'option2', title: 'Option 2', description: 'Description for Option 2' }];

  return (
    <Container>
      <MaxWidthPopup isOpen={isPopupOpen} onClose={closePopup}>
        <SectionContainer>
          <Title>Create Booking</Title>
          <InputContainer>
            <label>Title:</label>
            <TextInput name="Title" onChange={(e) => handleBooking("Title", e.target.value)} value={createBookingFormData.Title} placeholder="Enter Title" />
          </InputContainer>
          <InputContainer>
            <label>Description:</label>
            <TextArea name='Description' onChange={(e) => handleBooking("Description", e.target.value)} value={createBookingFormData.Description} placeholder="Enter Your Description" rows={3} />
          </InputContainer>
          <h4>When You are available for this booking?</h4>
          <RadioButtonContainer>
            {options.map((option) => (
              <RadioButtonLabel key={option.value}>
                <RadioButton
                  type="radio"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={() => handleOptionChange(option.value)}
                />
                {option.title} - {option.description}
              </RadioButtonLabel>
            ))}
          </RadioButtonContainer>
          <div>
            <Button onClick={handleCreateBooking}>Create Booking</Button>
            <StyledCancelButton onClick={closePopup}>Cancel</StyledCancelButton>
          </div>
        </SectionContainer>
      </MaxWidthPopup>

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

      <Button onClick={openPopup}>Create Booking</Button>
    </Container>
  );
};

export default BookingManagement;

// Styled Components definitions...


const MaxWidthPopup = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      contentLabel="Max Width Popup"
      style={{
        content: {
          maxWidth: '80%',
          margin: 'auto',
          backgroundColor: '#f7f7f7',
        },
      }}
    >
      {children}
    </Modal>
  );
};



// Styled components for BookingManagement
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

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #f5f5f5;

`;

const Title = styled.h1`
    color: ${colors.black};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  flex: 1;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RadioButton = styled.input`
  margin-right: 5px;
`;


const StyledCancelButton = styled(Button)`
  background-color: red;

  &:hover {
    background-color: ${colors.redDark};
  }
`;