import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from './colors';
import { toast } from 'react-toastify';

export default function SpecificDate({ createBookingFormData, handleBooking }) {
    const [inputsChanged, setInputsChanged] = useState(false);

    const [specificDatesSlots, setSpecificDatesSlots] = useState([
        { Specific_Date: '', From_Time: '', To_Time: '' }
    ]);

    useEffect(() => {
        setInputsChanged(true);
    }, [specificDatesSlots]);

    const handleAddTimeSlot = () => {
        setSpecificDatesSlots(prevSlots => [...prevSlots, { Specific_Date: '', From_Time: '', To_Time: '' }]);
    };

    const handleRemoveTimeSlot = index => {
        setSpecificDatesSlots(prevSlots => prevSlots.filter((slot, i) => i !== index));
    };

    const handleTimeChange = (index, key, value) => {
        const newTimeSlots = [...specificDatesSlots];
        newTimeSlots[index][key] = value;
        setSpecificDatesSlots(newTimeSlots);
    };

    const validateTimeSlots = () => {
        return specificDatesSlots.every(slot =>
            slot.Specific_Date.trim() !== '' &&
            slot.From_Time.trim() !== '' &&
            slot.To_Time.trim() !== ''
        );
    };

    const handleSaveSlots = () => {
        if (validateTimeSlots()) {
            const formattedSlots = specificDatesSlots.map(slot => ({
                Specific_Date: slot.Specific_Date,
                Time_Slots: [{
                    From_Time: slot.From_Time,
                    To_Time: slot.To_Time
                }]
            }));
            handleBooking("Specific_Dates_Available_Slots_Array", formattedSlots);
            setInputsChanged(false);
        } else {
            toast.error('Please fill in all fields for each time slot.');
        }
    };

    const renderTimeSlots = () => {
        return specificDatesSlots.map((slot, index) => (
            <DateWrapper key={index}>
                <TextInput
                    type="date"
                    value={slot.Specific_Date}
                    placeholder="Specific Date"
                    onChange={e => handleTimeChange(index, 'Specific_Date', e.target.value)}
                />
                <TextInput
                    type="time"
                    value={slot.From_Time}
                    placeholder="Start time"
                    onChange={e => handleTimeChange(index, 'From_Time', e.target.value)}
                />
                <TextInput
                    type="time"
                    value={slot.To_Time}
                    placeholder="End time"
                    onChange={e => handleTimeChange(index, 'To_Time', e.target.value)}
                />

                {index !== 0 && <Button className='remove' onClick={() => handleRemoveTimeSlot(index)}>Remove</Button>}
            </DateWrapper>
        ));
    };

    return (
        <Container>
            {createBookingFormData?.Booking_Type === '2' && (
                <>
                    {renderTimeSlots()}
                    <Button onClick={handleAddTimeSlot}>+ Add Time Slot</Button>
                    <SaveButton onClick={handleSaveSlots} disabled={!inputsChanged}>Save Slots</SaveButton>
                </>
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

const DateWrapper = styled.div`
    display: flex;
    margin-top: 15px;
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
    margin-top: 16px;
    right: 41px;
    &.remove {
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
    width: 25%;
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
    margin-right: 10px;
`;
