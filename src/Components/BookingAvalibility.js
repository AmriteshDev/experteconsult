import React, { useState } from 'react'

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


export default function BookingAvalibility({ createBookingFormData }) {
    const [selectedDay, setSelectedDay] = useState([])

    const handleSelectedDays = (value) => {
        console.log("valie=====", value)
        if (selectedDay.includes(value)) {
            setSelectedDay(selectedDay.filter((day) => day !== value))
        }
        else {
            setSelectedDay([
                ...selectedDay,
                value
            ])
        }

    }

    return (
        <>
            {
                createBookingFormData?.Option === "weekly" ? <weeklyAvalibility>
                    {
                        weekdays.map((day) => (
                            <div key={day}>
                                <input
                                    type='checkbox'
                                    name='weekdays'
                                    id={day}
                                    value={day}
                                    onChange={(e) => handleSelectedDays(e.target.value)}
                                />

                                {
                                    selectedDay.includes(day) ? (
                                        <div>
                                            <label htmlFor={day}>{day}</label>
                                            <input type='number' placeholder='Start time' />
                                            :
                                            <input type='number' placeholder='End time' />
                                            + Add Window
                                        </div>
                                    ) : <div>Unavailable</div>
                                }
                            </div>
                        ))
                    }
                </weeklyAvalibility> :
                    createBookingFormData?.Option === "specificDate" ? <specificDate> specificDate  </specificDate> : " "
            }
        </>
    )
}
