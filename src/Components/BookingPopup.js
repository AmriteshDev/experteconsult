
import React, { useState } from 'react'

import styled from 'styled-components';
import colors from './colors';
import BookingAvalibility from './BookingAvalibility';
import CheckBox from './CheckBox';
import AdvanceBooking from './AdvanceBooking';

const options = [{ value: 'weekly', title: 'Weekly', description: 'You are available one or more time during the week, every week.' }, { value: 'specificDate', title: 'Specific dates', description: 'You are available on specific dates.' }];

export default function BookingPopup(props) {

  const { closePopup, isPopupOpen, handleCreateBooking } = props
  const [selectedOption, setSelectedOption] = useState('');
  const [createBookingFormData, setCreateBookingFormData] = useState({})

  const handleBooking = (key, value) => {
    setCreateBookingFormData({
      ...createBookingFormData,
      [key]: value
    });
  };

  return (
    <div isOpen={isPopupOpen} onClose={closePopup}>
      <SectionContainer>
        <Title>Create Booking</Title>
        <InputContainer>
          <Label>Title:</Label>
          <TextInput name="Title" onChange={(e) => handleBooking("Title", e.target.value)} value={createBookingFormData.Title} placeholder="Enter Title" />
        </InputContainer>
        <InputContainer>
          <Label>URL:</Label>
          <TextInput name="URL" onChange={(e) => handleBooking("URL", e.target.value)} value={createBookingFormData.URL} placeholder="Enter URL" />
        </InputContainer>
        <InputContainer>
          <Label>Description:</Label>
          <TextArea name='Description' onChange={(e) => handleBooking("Description", e.target.value)} value={createBookingFormData.Description} placeholder="Enter Your Description" rows={3} />
        </InputContainer>
        <InputContainer>
          <Label>Duration:</Label>
          <TextInput name='Description' onChange={(e) => handleBooking("Description", e.target.value)} value={createBookingFormData.Description} placeholder="Enter Your Description" rows={3} /> minutes
        </InputContainer>
        <InputContainer>
          <Label>Add Price:</Label>
          <TextInput name="URL" onChange={(e) => handleBooking("URL", e.target.value)} value={createBookingFormData.URL} placeholder="Enter URL" />
          <Label>Offer Price:</Label>
          <TextInput name="URL" onChange={(e) => handleBooking("URL", e.target.value)} value={createBookingFormData.URL} placeholder="Enter URL" />
        </InputContainer>
        <h4>When You are available for this booking?</h4>
        <RadioButtonContainer>
          {options.map((option) => (
            <div key={option.value}>
              <RadioButtonWrapper>
                <RadioButtonRow>
                  <RadioButton
                    type="radio"
                    name='Option'
                    value={option.value}
                    checked={createBookingFormData.Option === option.value}
                    onChange={(e) => handleBooking("Option", e.target.value)}
                  />
                  <div>
                    <RadioButtonTitle>{option.title}</RadioButtonTitle>
                  </div>
                </RadioButtonRow>
                <RadioButtonDescription>
                  {option.description}
                </RadioButtonDescription>
              </RadioButtonWrapper>
            </div>
          ))}
        </RadioButtonContainer>
        <BookingAvalibility createBookingFormData={createBookingFormData} />
        <CheckBox
          id={"Add unavaiable detes"}
          title={"Add unavaiable detes"}
          description={"Define specific dates that will be excluded from your weekly availability."}
        />
        <h4>Hide advanced booking type settings</h4>
        <AdvanceBooking />

        <div>
          Location
          Select a location for this booking type below.

          <RadioButton
            type="radio"
            name='Option'
            // value={ }
            // checked={createBookingFormData.Option === option.value}
            onChange={(e) => handleBooking("Option", e.target.value)}
          />
        </div>
        <CheckBox
          id={"Charge for this bookings"}
          title={"Charge for this bookings"}
          description={"Allows you to set up a paid booking. Currently, we Stripe and PayPal"}
        />
        <CheckBox
          id={"Allow invitees to book more than one date at a time"}
          title={"Allow invitees to book more than one date at a time"}
          description={"Allow your invitee to pick more than one date on your calender"}
        />
        <CheckBox
          id={"Customize email reminders"}
          title={"Customize email reminders"}
          description={"By default, TidyCal sends two reminders (24 hours and 1 hour before). Select this option to change the subject line,body copy, or timing of these two reminders."}
        />
        <CheckBox
          id={"Add confirmation redirect URL"}
          title={"Add confirmation redirect URL"}
          description={"Redirect your invitee to a custom URL after a successful booking action."}
        />
        <CheckBox
          id={"Private mode"}
          title={"Private mode"}
          description={"Shhh... hide this Booking Type on your public Booking Page. You can still share this Booking Type URL privately."}
        />
        <CheckBox
          id={"Display on Booking Types Directory"}
          title={"Display on Booking Types Directory"}
          description={"Show off your Booking Type on the Booking Types Directory to get more attention,"}
        />

        <ButtonContainer>
          <button onClick={handleCreateBooking}>Create Booking</button>
          <button onClick={closePopup}>Cancel</button>
        </ButtonContainer>
      </SectionContainer>
    </div>
  )
}


const Title = styled.h1`
  color: ${colors.black};
  align-self: center;
`;

const Label = styled.label`
  text-align: left;
  color: ${colors.black};
  min-width: 100px;
`;
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #f5f5f5;
 
`;
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  width: 75%;
  padding: 10px;
  border: 1px solid ${colors.gray}; 
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer; 
  &:focus {
      outline: none; 
      border-color: ${colors.primary}; 
  }
  &:hover {
      border-color: ${colors.primary}; 
  }
  margin-right: 10px 
`;

const TextArea = styled.textarea`
  width: 75%;
  padding: 10px;
  border: 1px solid ${colors.gray}; 
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer; 
  &:focus {
      outline: none; 
      border-color: ${colors.primary}; 
  }
  &:hover {
      border-color: ${colors.primary}; 
  }
  margin-right: 10px 
`;

const RadioButtonContainer = styled.div`
  display: flex;
  // flex-direction: column;
  margin-top: 10px;
  border-radius: 15px;
  background-color: ${colors.white};

`;
const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 9px;
`;
const RadioButtonRow = styled.div`
  display: flex;
 
`;

const RadioButton = styled.input`
  margin-right: 10px;
  margin-top: -15px;
`;

// const RadioButtonTitle = styled.div`
//   font-weight: 600;
// `;
const RadioButtonTitle = styled.h4`
    color: ${colors.black};
`;
const RadioButtonDescription = styled.div`
  margin-top: 5px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button:first-child {
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
  }

 
  button:last-child {
    background-color: red;
    color: ${colors.white};
    max-width: 150px;
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
`;