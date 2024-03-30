
import React, { useEffect, useState } from 'react'

import styled from 'styled-components';
import colors from './colors';
import BookingAvalibility from './BookingAvalibility';
import CheckBox from './CheckBox';
import AdvanceBooking from './AdvanceBooking';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';

const options = [{ value: "1", title: 'Weekly', description: 'You are available one or more time during the week, every week.' }, { value: "2", title: 'Specific dates', description: 'You are available on specific dates.' }];

export default function BookingPopup(props) {
  const [isHide, setIsHide] = useState(true);

  const { setIsOpen } = props

  const selectedBooking = props.selectedBooking.length > 0 ? props.selectedBooking[0] : {}

  const [createBookingFormData, setCreateBookingFormData] = useState({})

  const [selctedCheckBox, setSelectedCheckBox] = useState({})

  useEffect(() => {
    setCreateBookingFormData({
      Title: selectedBooking.Title || "",
      URL: selectedBooking.URL || "",
      Description: selectedBooking.Description || "",
      Duration: selectedBooking.Duration || null,
      Price: selectedBooking.Price || null,
      Offer_Price: selectedBooking.Offer_Price || null,
      Booking_Type: selectedBooking?.Booking_Type?.toString() || "",
      Physical_Address: selectedBooking.Physical_Address || "",
      PhoneNumber: selectedBooking.PhoneNumber || "",
      Far_Days_User_Can_Book: selectedBooking.Far_Days_User_Can_Book || "",
      Minimum_Meeting_Padding_Minutes: selectedBooking.Minimum_Meeting_Padding_Minutes || "",
      Cannot_Schedule_Within_Hours: selectedBooking.Cannot_Schedule_Within_Hours || "",
      Slot_Interval_Minutes: selectedBooking.Slot_Interval_Minutes || "",
      Booking_Limit_Per_Day: selectedBooking.Booking_Limit_Per_Day || null,
      Multiple_Invites_For_Same_Booking: selectedBooking.Multiple_Invites_For_Same_Booking || "",
      Location_Type: selectedBooking.Location_Type || "",
      Weekly_Available_Slots_Array: selectedBooking.Weekly_Available_Slots_Array || [],
      Specific_Dates_Available_Slots_Array: selectedBooking.Specific_Dates_Available_Slots_Array || [],
    })
    setSelectedCheckBox({
      chargeForBooking: selectedBooking.chargeForBooking ?? false,
      Whether_Multiple_Invites_For_Same_Booking: selectedBooking.Whether_Multiple_Invites_For_Same_Booking ?? false,
      Whether_Offer_Price: selectedBooking.Whether_Offer_Price ?? false,
      Whether_Booking_Limit_Per_Day: selectedBooking.Whether_Booking_Limit_Per_Day ?? false,
      unavaiableDetes: selectedBooking.unavaiableDete ?? false,
    })
  }, [selectedBooking])


  const handleCheckboxChange = (key, value) => {
    console.log(key, value)
    setSelectedCheckBox({
      ...selctedCheckBox,
      [key]: value
    });
    console.log(value)
  };

  const toggle = () => {
    setIsHide(!isHide)
  }

  const handleBooking = (key, value) => {
    setCreateBookingFormData({
      ...createBookingFormData,
      [key]: value
    });
  };

  const handleSave = (Client_Booking_ManagmentID) => {
    let URL
    const request = {
      Title: createBookingFormData.Title,
      URL: createBookingFormData.URL,
      Description: createBookingFormData.Description,
      Duration: parseInt(createBookingFormData.Duration),
      Price: parseInt(createBookingFormData.Price),
      Offer_Price: parseInt(createBookingFormData.Offer_Price),
      Booking_Type: parseInt(createBookingFormData.Booking_Type),
      Physical_Address: createBookingFormData.Physical_Address,
      PhoneNumber: createBookingFormData.PhoneNumber,
      Far_Days_User_Can_Book: parseInt(createBookingFormData.Far_Days_User_Can_Book),
      Minimum_Meeting_Padding_Minutes: parseInt(createBookingFormData.Minimum_Meeting_Padding_Minutes),
      Cannot_Schedule_Within_Hours: parseInt(createBookingFormData.Cannot_Schedule_Within_Hours),
      Slot_Interval_Minutes: parseInt(createBookingFormData.Slot_Interval_Minutes),
      Booking_Limit_Per_Day: parseInt(createBookingFormData.Booking_Limit_Per_Day),
      Whether_Multiple_Invites_For_Same_Booking: selctedCheckBox.Whether_Multiple_Invites_For_Same_Booking,
      Whether_Offer_Price: selctedCheckBox.Whether_Offer_Price === "1" ? true : false,
      Whether_Booking_Limit_Per_Day: selctedCheckBox.Whether_Booking_Limit_Per_Day,
      Location_Type: parseInt(createBookingFormData.Location_Type),
      Weekly_Available_Slots_Array: createBookingFormData.Weekly_Available_Slots_Array,
      Specific_Dates_Available_Slots_Array: createBookingFormData.Specific_Dates_Available_Slots_Array,
      Multiple_Invites_For_Same_Booking: 3,
    }

    if (Client_Booking_ManagmentID) {
      URL = '/Update_Client_Booking_Management'
      request.Client_Booking_ManagmentID = Client_Booking_ManagmentID
    } else {
      URL = '/Create_Client_Booking_Management'
      request.ClientID = props.selectedClientData.ClientID
    }

    fetchPostData(URL, request)
      .then(response => {
        if (response.success) {
          toast.success(response.extras.Status || `${Client_Booking_ManagmentID ? 'Updated' : 'Added'} Successfully`)
          setCreateBookingFormData({
            Title: "",
            URL: "",
            Description: "",
            Duration: "",
            Price: "",
            Offer_Price: "",
            Booking_Type: "",
            Physical_Address: "",
            PhoneNumber: "",
            Far_Days_User_Can_Book: "",
            Minimum_Meeting_Padding_Minutes: "",
            Cannot_Schedule_Within_Hours: "",
            Slot_Interval_Minutes: "",
            Booking_Limit_Per_Day: "",
            Multiple_Invites_For_Same_Booking: "",
            Location_Type: "",
            Weekly_Available_Slots_Array: "",
            Specific_Dates_Available_Slots_Array: "",
          })
          setSelectedCheckBox({
            Whether_Multiple_Invites_For_Same_Booking: false,
            Whether_Offer_Price: false,
            Whether_Booking_Limit_Per_Day: false,
          })
          setIsOpen(false)
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.extras.msg || 'something went wrong');
      });
  };

  return (
    <div >
      <SectionContainer>
        <Title>Create Booking</Title>
        <InputContainer>
          <Label>Title</Label>
          <TextInput name="Title" onChange={(e) => handleBooking("Title", e.target.value)} value={createBookingFormData.Title} placeholder="Enter Title" />
        </InputContainer>

        {/* <InputContainer>
          <Label>URL</Label>
          <TextInput name="URL" onChange={(e) => handleBooking("URL", e.target.value)} value={createBookingFormData.URL} placeholder="Enter URL" />
        </InputContainer> */}

        <InputContainer>
          <Label>Description</Label>
          <TextArea name='Description' onChange={(e) => handleBooking("Description", e.target.value)} value={createBookingFormData.Description} placeholder="Enter Your Description" rows={3} />
        </InputContainer>

        <InputContainer>
          <Label>Duration</Label>
          <TextInput type="number" className='Duration' name='Duration' onChange={(e) => handleBooking("Duration", e.target.value)} value={createBookingFormData.Duration} rows={3} /> <Label className='sublable'>minutes</Label>
        </InputContainer>

        <InputContainer>
          <Label >Add Price</Label>
          <TextInput className='price' type="number" name="Price" onChange={(e) => handleBooking("Price", e.target.value)} value={createBookingFormData.Price} />
        </InputContainer>

        <CheckBox
          initialValue={selctedCheckBox.Whether_Offer_Price}
          title="Add Offer Price"
          onChange={(value) => handleCheckboxChange('Whether_Offer_Price', value)}
        />
        {selctedCheckBox.Whether_Offer_Price &&
          <InputContainer>
            <Label >Offer Price</Label>
            <TextInput className='price' type="number" name="Offer_Price" onChange={(e) => handleBooking("Offer_Price", e.target.value)} value={createBookingFormData.Offer_Price} />
          </InputContainer>
        }

        <h4 style={{ marginBottom: "2x" }}>When You are available for this booking?</h4>
        <RadioButtonContainer>
          {options.map((option) => (
            <div style={{ width: "50%" }} key={option.value}>
              <RadioButtonWrapper>
                <RadioButtonRow >
                  <RadioButtonStyle
                    type="radio"
                    name='Booking_Type'
                    value={option.value}
                    checked={createBookingFormData.Booking_Type === option.value}
                    onChange={(e) => handleBooking("Booking_Type", e.target.value)}
                  />
                  <RadioButtonTitle>{option.title}</RadioButtonTitle>
                </RadioButtonRow>
                <RadioButtonDescription>
                  {option.description}
                </RadioButtonDescription>
              </RadioButtonWrapper>
            </div>
          ))}
        </RadioButtonContainer>

        {

        }
        <BookingAvalibility createBookingFormData={createBookingFormData} handleBooking={handleBooking} />

        {/* <CheckBox
          initialValue={selctedCheckBox.unavaiableDetes}
          title={"Add unavaiable detes"}
          description={"Define specific dates that will be excluded from your weekly availability."}
          onChange={(value) => handleCheckboxChange('unavaiableDetes', value)}
        /> */}
        {
          selctedCheckBox.unavaiableDetes &&
          <InputContainer>
            <TextInput type="number" name='Duration' onChange={(e) => handleBooking("Duration", e.target.value)} value={createBookingFormData.Duration} rows={3} />
          </InputContainer>
        }

        <CheckBox
          initialValue={selctedCheckBox.Whether_Multiple_Invites_For_Same_Booking}
          title={"Allow invitees to book more than one date at a time"}
          description={"Allow your invitee to pick more than one date on your calender"}
          onChange={(value) => handleCheckboxChange('Whether_Multiple_Invites_For_Same_Booking', value)}
        />
        {
          selctedCheckBox.Whether_Multiple_Invites_For_Same_Booking &&
          <InputContainer>
            <TextInput type="number" name='Multiple_Invites_For_Same_Booking' onChange={(e) => handleBooking("Multiple_Invites_For_Same_Booking", e.target.value)} value={createBookingFormData.Multiple_Invites_For_Same_Booking} rows={3} />
          </InputContainer>
        }
        {/* <CheckBox
          initialValue={selctedCheckBox.chargeForBooking}
          title={"Charge for this bookings"}
          description={"Allows you to set up a paid booking. Currently, we Stripe and PayPal"}
          onChange={(value) => handleCheckboxChange('chargeForBooking', value)}
        />
        <CheckBox
          value={"Customize email reminders"}
          title={"Customize email reminders"}
          description={"By default, TidyCal sends two reminders (24 hours and 1 hour before). Select this option to change the subject line,body copy, or timing of these two reminders."}
        />
        <CheckBox
          value={"Add confirmation redirect URL"}
          title={"Add confirmation redirect URL"}
          description={"Redirect your invitee to a custom URL after a successful booking action."}
        />
        <CheckBox
          value={"Private mode"}
          title={"Private mode"}
          description={"Shhh... hide this Booking Type on your public Booking Page. You can still share this Booking Type URL privately."}
        />
        <CheckBox
          value={"Display on Booking Types Directory"}
          title={"Display on Booking Types Directory"}
          description={"Show off your Booking Type on the Booking Types Directory to get more attention,"}
        /> */}

        <div>
          <ShowHideButton onClick={toggle}>{`${isHide ? 'Show' : 'Hide'}`} advanced booking type settings</ShowHideButton>
        </div>
        {!isHide && <AdvanceBooking handleCheckboxChange={handleCheckboxChange} selctedCheckBox={selctedCheckBox} createBookingFormData={createBookingFormData} selectedBooking={selectedBooking} handleBooking={handleBooking} />}

        <ButtonContainer>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => handleSave(selectedBooking.Client_Booking_ManagmentID)}>{selectedBooking.Client_Booking_ManagmentID ? 'Update' : 'Create'} Booking</button>
        </ButtonContainer>
      </SectionContainer >
    </div >
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
  &.sublable{
    margin-top: 7px;
  }
`;
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  &.containerInput{
    display:flex;
  }
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
  margin-right: 10px ;
  &.Duration{
    width: 10%;
  }
  &.price{
    width:20%;
    align-items: baseline;
   
  }
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
  margin-bottom: 12px;
  `;
const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 9px;
  height: 85%;
  border-radius: 20px;
  background-color: ${colors.white};

`;
const RadioButtonRow = styled.div`
  display: flex;
 
`;

const RadioButtonStyle = styled.input`
  margin-right: 10px;
`;

const RadioButtonTitle = styled.div`
  font-weight: 600;
`;
const RadioButtonDescription = styled.div`
  margin-top: 7px;
  margin-left: 5px;
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

const ShowHideButton = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    margin-top: 20px;
    padding: 6px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`;