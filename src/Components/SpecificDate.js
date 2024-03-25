import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';
import SpecificDate from './SpecificDate';

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function BookingAvailability({ createBookingFormData, choosenSlots }) {
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});

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

    const generateSpecificSlotsArray = () => {
        const specificSlotsArray = [];
        selectedDays.forEach(day => {
            const timeSlotsForDay = timeSlots[day] || [];
            specificSlotsArray.push({
                Date: day,
                Time_Slots: timeSlotsForDay
            });
        });
        return specificSlotsArray;
    };

    const handleSaveSlots = () => {
        const slots = createBookingFormData?.Option === 'weekly' ? generateWeeklySlotsArray() : generateSpecificSlotsArray();
        choosenSlots({ Slots_Array: slots });
    };

    const renderTimeSlots = (day) => {
        const slots = timeSlots[day] || [];
        return (
            <>
                {slots.map((slot, index) => (
                    <div key={index}>
                        <TextInput
                            type="text"
                            value={slot.From_Time}
                            placeholder="Start time"
                            onChange={(e) => handleTimeChange(day, index, 'From_Time', e.target.value)}
                        />
                        <TextInput
                            type="text"
                            value={slot.To_Time}
                            placeholder="End time"
                            onChange={(e) => handleTimeChange(day, index, 'To_Time', e.target.value)}
                        />
                        {index === slots.length - 1 && (
                            <Button onClick={() => handleAddTimeSlot(day)}>+ Add Time Slot</Button>
                        )}
                        {index !== slots.length - 1 && (
                            <Button onClick={() => handleRemoveTimeSlot(day, index)}>Remove</Button>
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
            {createBookingFormData?.Option === 'weekly' ? (
                <WeeklyAvailability>
                    {weekdays.map((day, index) => (
                        <DayWrapper key={day}>
                            <div style={{ width: "20%" }}>
                                <input
                                    type="checkbox"
                                    name="weekdays"
                                    id={day}
                                    value={day}
                                    onChange={(e) => handleSelectedDays(e.target.value)}
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
                            <hr />
                        </DayWrapper>
                    ))}
                </WeeklyAvailability>
            ) : createBookingFormData?.Option === 'specificDate' ? (
                <SpecificDateAvailability>
                    <SpecificDateSlots>
                        <SpecificDate isMulti={true} />
                    </SpecificDateSlots>
                    {selectedDays.map(day => (
                        <DayWrapper key={day}>
                            <div>
                                {day}
                            </div>
                            <div>
                                {renderTimeSlots(day)}
                            </div>
                            <hr />
                        </DayWrapper>
                    ))}
                </SpecificDateAvailability>
            ) : null}
            <SaveButton onClick={handleSaveSlots}>Save Slots</SaveButton>
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

const WeeklyAvailability = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecificDateAvailability = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecificDateSlots = styled.div`
  margin-bottom: 10px;
`;

const DayWrapper = styled.div`
  display: flex;
  margin-top: 15px;

  div:first-of-type {
    width: 30%;
  }

  div:not(:first-of-type) {
    flex: 1;
  }
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
`;

const SaveButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
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

`;