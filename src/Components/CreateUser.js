import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const roleLabels = [
    { id: 'WetherClients', title: 'Clients' },
    { id: 'WetherBanner', title: 'Banners' },
    { id: 'WetherPayment', title: 'Payments' },
    { id: 'WetherMeeting', title: 'Meeting' },
    { id: 'WetherBooking', title: 'Booking' },
    { id: 'WetherDocument', title: 'Document' },
    { id: 'WetherCostumers', title: 'Customer' },
    { id: 'WetherContact', title: 'Contact Me' },
    { id: 'WetherAboutUs', title: 'About Us' },
    { id: 'WetherBasicInfo', title: 'Client BasicInfo' },
    { id: 'WetherLayout', title: 'Client Layout' },
    { id: 'WetherInput', title: 'Client Input' },
    { id: 'WetherLinks', title: 'Client Links' },
    { id: 'WetherClientPayment', title: 'Client Payment' },
    { id: 'WetherBookings', title: 'Client Bookings' },
    { id: 'WetherPricing', title: 'Client Pricing' },
    { id: 'WetherTerms', title: 'Client Terms' },
    { id: 'WetherCustomers', title: 'Client Customers' },
    { id: 'WetherAbout', title: 'Client About' },
    { id: 'WetherContact', title: 'Client Contact' },
];

function CreateUser(props) {

    const [formData, setFormData] = useState({
        typeOfAdmin: '',
        Name: '',
        PhoneNumber: '',
        EmailID: '',
        Password: ''
    });

    const handleInput = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const request = {
            typeOfAdmin: formData.typeOfAdmin,
            Name: formData.Name,
            PhoneNumber: formData.PhoneNumber,
            EmailID: formData.EmailID,
            Password: formData.Password,
            Role: formData.Roles
        }

        console.log('request ===>>> ', request)

        const url = props.Selected_AdminID ? 'https://api.experteconsult.com/admin/Update_Admin_Information' : 'https://api.experteconsult.com/admin/Create_Admin_User';

        axios.post(url, request)
            .then(response => {
                console.log('Form data submitted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            });
    };

    const Checkbox = ({ id, title }) => {
        if (!formData.Roles) {
            formData.Roles = {};
        }
        const checked = formData?.Roles[id];

        const handleChange = () => {
            formData.Roles = {
                ...formData.Roles,
                [id]: !checked,
            };
            setFormData(formData)
        };

        return (
            <label style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-start', whiteSpace: 'nowrap' }}>
                <input
                    style={{ paddingRight: 15 }}
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                {title}
            </label>
        );
    };

    return (
        <div>
            <FormContainer className="form-container">
                <form onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="typeOfAdmin">Type of Admin:</FormLabel>
                        <Select id="typeOfAdmin" name="typeOfAdmin" value={formData.typeOfAdmin} onChange={(e) => handleInput('typeOfAdmin', e.target.value)}>
                            <option value="">Select an option</option>
                            <option value='2'>Modular</option>
                            <option value="3">Independent</option>
                        </Select>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="Name">Name:</FormLabel>
                        <Input
                            type="text"
                            id="Name"
                            name="Name"
                            value={formData.Name}
                            onChange={(e) => handleInput('Name', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="PhoneNumber">Phone Number:</FormLabel>
                        <Input
                            type="tel"
                            id="PhoneNumber"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={(e) => handleInput('PhoneNumber', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="EmailID">Email Id:</FormLabel>
                        <Input
                            type="email"
                            id="EmailID"
                            name="EmailID"
                            value={formData.EmailID}
                            onChange={(e) => handleInput('EmailID', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="Password">Password:</FormLabel>
                        <Input
                            type="password"
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={(e) => handleInput('Password', e.target.value)}
                        />
                    </FormGroup>
                    {formData.typeOfAdmin === '2' &&
                        <CheckboxContainer>
                            {roleLabels.map((item, index) => (
                                <Checkbox key={index} id={item.id} title={item.title} />
                            ))}
                        </CheckboxContainer>
                    }
                    <FormGroup className="form-group">
                        <FormButton type="submit">{formData.Selected_AdminID ? "Update" : "Create"}</FormButton>
                    </FormGroup>
                </form>
            </FormContainer>
        </div>
    )
}

export default CreateUser;

const FormContainer = styled.div`
  margin: 2%;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.label`
  align-self: flex-start;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
`;

const Input = styled.input`
    width: 92%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const FormLabel = styled.label`
  align-self: flex-start;
`;
