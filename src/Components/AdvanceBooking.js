import React, { useState } from 'react'
import CheckBox from './CheckBox';
import colors from './colors';
import styled from 'styled-components';
import RadioButton from './RadioButton';




export default function AdvanceBooking({ handleCheckboxChange, selctedCheckBox, createBookingFormData, handleBooking }) {
    const [Location_Type, setLocation_Type] = useState(1);

    const handleLocation = (value) => {
        setLocation_Type(parseInt(value))
        handleBooking('Location_Type', parseInt(value))
    }

    return (
        <Container>
            <Title>
                Availability details:
            </Title>
            <ContainerWrapper>
                <Row>
                    <InputContainer>
                        <Label>How far out can users book?</Label>
                        <div style={{ display: 'flex', marginTop: "10px", marginLeft: "10px" }}>
                            <TextInput name='Far_Days_User_Can_Book' onChange={(e) => handleBooking("Far_Days_User_Can_Book", e.target.value)} value={createBookingFormData.Far_Days_User_Can_Book} rows={3} /> <Label className='sublabel'>days ahead.</Label>
                        </div>

                    </InputContainer>
                    <InputContainer>
                        <Label>Minimun meeting padding:</Label>
                        <div style={{ display: 'flex', marginTop: "10px", marginLeft: "10px" }}>
                            <TextInput name='Minimum_Meeting_Padding_Minutes' onChange={(e) => handleBooking("Minimum_Meeting_Padding_Minutes", e.target.value)} value={createBookingFormData.Minimum_Meeting_Padding_Minutes} rows={3} /><Label className='sublabel'> minutes.</Label>
                        </div>
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <Label>Bookers can't schedule within:</Label>
                        <div style={{ display: 'flex', marginTop: "10px", marginLeft: "10px" }}>
                            <TextInput name='Cannot_Schedule_Within_Hours' onChange={(e) => handleBooking("Cannot_Schedule_Within_Hours", e.target.value)} value={createBookingFormData.Cannot_Schedule_Within_Hours} rows={3} /> <Label className='sublabel'>of current time.</Label>
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <Label>Available time slot interval:</Label>
                        <div style={{ display: 'flex', marginTop: "10px", marginLeft: "10px" }}>
                            <TextInput name='Slot_Interval_Minutes' onChange={(e) => handleBooking("Slot_Interval_Minutes", e.target.value)} value={createBookingFormData.Slot_Interval_Minutes} rows={3} /><Label className='sublabel'>of current time.</Label>
                        </div>
                    </InputContainer>
                </Row>
            </ContainerWrapper>
            <CheckBox
                initialValue={selctedCheckBox.Whether_Booking_Limit_Per_Day}
                title={"Limit booking"}
                onChange={(value) => handleCheckboxChange('Whether_Booking_Limit_Per_Day', value)}
            />
            {
                selctedCheckBox.Whether_Booking_Limit_Per_Day &&
                <div style={{ display: 'flex', marginTop: "10px", marginLeft: "10px" }}>
                    <TextInput name='Booking_Limit_Per_Day' onChange={(e) => handleBooking("Booking_Limit_Per_Day", e.target.value)} value={createBookingFormData.Booking_Limit_Per_Day} rows={3} /><Label className='sublabel'>per day</Label>
                </div>
            }

            <LocationContainer>
                <LocationTitle>Location</LocationTitle>
                <div style={{ marginTop: "7px", marginLeft: "5px" }}>Select a location for this booking type below.</div>
                <RadioButton
                    initialValue={Location_Type}
                    name='Location_Type'
                    labelName={["Online video conference", "Physical address", "Phone Number", "No location"]}
                    handleRadioButton={(value) => handleLocation(value)}
                />

                {
                    Location_Type === 1 &&
                    <InputContainer>
                        <Label>URL</Label>
                        <TextInput name="URL" onChange={(e) => handleBooking("URL", e.target.value)} value={createBookingFormData.URL} placeholder="Enter URL" />
                    </InputContainer>
                }
                {
                    Location_Type === 2 &&
                    <InputContainer>
                        <Label>Physical_Address</Label>
                        <TextArea name="Physical_Address" onChange={(e) => handleBooking("Physical_Address", e.target.value)} value={createBookingFormData.Physical_Address} placeholder="Enter Physical_Address" />
                    </InputContainer>
                }
                {
                    Location_Type === 3 &&
                    <InputContainer>
                        <Label>PhoneNumber</Label>
                        <TextInput name='PhoneNumber' onChange={(e) => handleBooking("PhoneNumber", e.target.value)} value={createBookingFormData.PhoneNumber} placeholder="Enter Your PhoneNumber" rows={3} />
                    </InputContainer>
                }
            </LocationContainer>
        </Container>
    )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 15px;
  padding: 11px;
  background-color: ${colors.white};
`;

const ContainerWrapper = styled.div`
  display: flex;
  margin: 15px;
  justify-content: space-evenly;
`;
const Row = styled.div`
 
`;
const Title = styled.div`
    color: ${colors.black};
    font-weight: 600;
`;
const Label = styled.label`
  text-align: left;
  color: ${colors.black};
  min-width: 100px;
  &.sublabel{
    align-self: center;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  width: 30%;
  padding: 10px;
  border: 1px solid  #8d8484;; 
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

const LocationContainer = styled.div`
  background-color: ${colors.white};
  margin-top: 15px; 
  padding: 10px;
  border-radius: 10px;
`;

const LocationTitle = styled.div`
    color: ${colors.black};
    font-weight: 600;
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
