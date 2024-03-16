import React, { useState } from 'react';
import styled from 'styled-components';
import colors from './colors';

export default function Payment({ setTab }) {

    const [formData, setFormData] = useState({
        dropdown: '',
        serialNumber: '',
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any actions with the form data here
        console.log('Form data submitted:', formData);
    };
    return (
        // <Container>
        //     <Title>Payment Gateway</Title>
        //     <RowContainer>
        //         <FormContainer>
        //             <form onSubmit={handleSubmit}>
        //                 <FormGroup>
        //                     <Label htmlFor="dropdown">Payment Gateway:</Label>
        //                     <Select
        //                         id="dropdown"
        //                         name="dropdown"
        //                         value={formData.dropdown}
        //                         onChange={handleChange}
        //                     >
        //                         <option value="">Select an option</option>
        //                         <option value="Modular">phonepay</option>
        //                         <option value="Independent">razorpay</option>
        //                     </Select>
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <Label htmlFor="serialNumber">key:</Label>
        //                     <Input
        //                         type="text"
        //                         id="serialNumber"
        //                         name="serialNumber"
        //                         value={formData.serialNumber}
        //                         onChange={handleChange}
        //                     />
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <Label htmlFor="name">key secret:</Label>
        //                     <Input
        //                         type="text"
        //                         id="name"
        //                         name="name"
        //                         value={formData.name}
        //                         onChange={handleChange}
        //                     />
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <Button onClick={() => { setTab(5) }}>Save</Button>
        //                 </FormGroup>
        //             </form>
        //         </FormContainer>
        //     </RowContainer>
        // </Container>

        <div></div>
    )
}

// const Container = styled.div`
//   width: 95%;
//   align-self: center;
//   margin-top: 20px;
//   align-items: center;
//   flex-direction: column;
//   display: flex;
// `;

// const Title = styled.h1`
//   color: ${colors.black}; /* Using colors.black */
// `;

// const RowContainer = styled.div`
//   flex-direction: row;
//   display: flex;
//   width: 80%;
// `;

// const FormContainer = styled.div`
//   width: 30%;
//   display: flex;
//   flex-direction: column;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   align-items: flex-start;
//   align-self: flex-start;
//   text-align: left;
// `;

// const Select = styled.select`
//   width: 100%;
// `;

// const Input = styled.input`
//   width: 100%;
// `;

// const Button = styled.button`
//   background-color: ${colors.primary}; /* Using colors.primary */
//   max-width: 150px;
//   margin-top: 30px;
// `;
