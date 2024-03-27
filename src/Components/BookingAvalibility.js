import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from './colors';
import SpecificDate from './SpecificDate';
import { toast } from 'react-toastify';

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function BookingAvailability({ createBookingFormData, handleBooking }) {
    console.log('createBookingFormData ===>>> ', createBookingFormData.Weekly_Available_Slots_Array)
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState();
    const [inputsChanged, setInputsChanged] = useState(false);

    // useEffect to set default time slots when data is available
    useEffect(() => {
        if (createBookingFormData?.Weekly_Available_Slots_Array) {
            const defaultTimeSlots = {};
            createBookingFormData.Weekly_Available_Slots_Array.forEach(slot => {
                const day = weekdays[slot.Day_Number - 1];
                defaultTimeSlots[day] = slot.Time_Slots.map(timeSlot => ({
                    From_Time: timeSlot.From_Time,
                    To_Time: timeSlot.To_Time
                }));
            });
            setTimeSlots(defaultTimeSlots);
            setSelectedDays(Object.keys(defaultTimeSlots));
        }
    }, [createBookingFormData]);


    useEffect(() => {
        setInputsChanged(true);
    }, [timeSlots]);

    const handleSelectedDays = (value) => {
        if (!selectedDays.includes(value)) {
            setSelectedDays([...selectedDays, value]);
            setTimeSlots(prevState => ({
                ...prevState,
                [value]: [{ From_Time: '', To_Time: '' }]
            }));
        } else {
            setSelectedDays(selectedDays.filter(day => day !== value));
            const newTimeSlots = { ...timeSlots };
            delete newTimeSlots[value];
            setTimeSlots(newTimeSlots);
        }
    };

    const handleAddTimeSlot = (day) => {
        const newTimeSlot = {
            From_Time: '',
            To_Time: ''
        };
        setTimeSlots(prevState => ({
            ...prevState,
            [day]: [...(prevState[day] || []), newTimeSlot]
        }));
    };

    const handleRemoveTimeSlot = (day, index) => {
        setTimeSlots(prevState => ({
            ...prevState,
            [day]: prevState[day].filter((slot, i) => i !== index)
        }));
    };

    const handleTimeChange = (day, index, key, value) => {
        console.log(key, value)
        const newTimeSlots = { ...timeSlots };
        newTimeSlots[day][index][key] = value;
        setTimeSlots(newTimeSlots);
    };

    const generateWeeklySlotsArray = () => {
        const weeklySlotsArray = [];
        weekdays.forEach((day, index) => {
            if (selectedDays.includes(day)) {
                const timeSlotsForDay = timeSlots[day] || [];
                weeklySlotsArray.push({
                    Day_Number: index + 1,
                    Time_Slots: timeSlotsForDay
                });
            }
        });
        return weeklySlotsArray;
    };

    const validateTimeSlots = () => {
        for (const day in timeSlots) {
            const slots = timeSlots[day];
            for (const slot of slots) {
                if (!slot.From_Time || !slot.To_Time) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSaveSlots = () => {
        if (validateTimeSlots()) {
            const slots = generateWeeklySlotsArray();
            handleBooking("Weekly_Available_Slots_Array", slots);
            setInputsChanged(false);
        } else {
            toast.error('Please fill in all time slots.');
        }
    };

    const renderTimeSlots = (day) => {
        const slots = timeSlots[day] || [];
        return (
            <>
                {slots.map((slot, index) => (
                    <div key={index}>
                        <TextInput
                            type="time"
                            value={slot.From_Time}
                            placeholder="Start time"
                            onChange={(e) => handleTimeChange(day, index, 'From_Time', e.target.value)}
                        />
                        <TextInput
                            type="time"
                            value={slot.To_Time}
                            placeholder="End time"
                            onChange={(e) => handleTimeChange(day, index, 'To_Time', e.target.value)}
                        />
                        {index === slots.length - 1 && (
                            <Button onClick={() => handleAddTimeSlot(day)}>+ Add Time Slot</Button>
                        )}
                        {index !== slots.length - 1 && (
                            <Button className='remove' onClick={() => handleRemoveTimeSlot(day, index)}>Remove</Button>
                        )}
                    </div>
                ))}
                {slots.length === 0 && (
                    <Button onClick={() => handleAddTimeSlot(day)}>+ Add Time Slot</Button>
                )}
            </>
        );
    };

    return (
        <Container>
            {createBookingFormData?.Booking_Type === '1' ? (
                <>
                    {weekdays.map((day, index) => (
                        <>
                            <DayWrapper key={day}>
                                <div style={{ width: "20%" }}>
                                    <input
                                        type="checkbox"
                                        name="weekdays"
                                        id={day}
                                        value={day}
                                        onChange={(e) => handleSelectedDays(e.target.value)}
                                        checked={selectedDays.includes(day)}
                                    />
                                    <label htmlFor={day}>{day}</label>
                                </div>
                                <div>
                                    {selectedDays.includes(day) ? (
                                        <>
                                            {renderTimeSlots(day)}
                                        </>
                                    ) : (
                                        <div>Unavailable</div>
                                    )}
                                </div>

                            </DayWrapper>
                            <HorizontalLine />
                        </>
                    ))}
                    <SaveButton onClick={handleSaveSlots} disabled={!inputsChanged}>Save Slots</SaveButton>
                </>
            ) : createBookingFormData?.Booking_Type === '2' ? (
                <SpecificDate createBookingFormData={createBookingFormData} handleBooking={handleBooking} />
            ) : (
                ' '
            )}
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${colors.white};
`;
const DayWrapper = styled.div`
        display: flex;
        margin-top: 15px;
        div:first-of-type {
            width: 30%;
            display: inline;
        }
        div:not(:first-of-type) {
            flex: 1;
        }
`;
const HorizontalLine = styled.hr`
    border: 0;
    border-top: 1px solid  #8b8787;
    margin: 10px 0;
`;
const Button = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    right: 41px;
    &.remove{
        background-color: #f73939;
    }
`;
const SaveButton = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 135px;
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const TextInput = styled.input`
  width: 30%;
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
  `;
