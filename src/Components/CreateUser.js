import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';
import Select from 'react-select';
import colors from './colors';


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
        Role_Type: '',
        Name: '',
        PhoneNumber: '',
        EmailID: '',
        Password: '',
        Whether_All_Clients: false,
        Designation: '',
        Roles: '',
        ClientID_Array: []
    });
    const [selectedOption, setSelectedOption] = useState("")
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getClentData()
    }, [])

    const handleAllClientsCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setSelectedOption(isChecked ? options : []);
        setFormData({
            ...formData,
            Whether_All_Clients: isChecked
        });
    };

    const getClentData = () => {
        const request = {
            "Skip": 0,
            "Limit": 10,
            "Whether_Status_Filter": false,
            "Status": false,
            "Whether_Search_Filter": false,
            "Search": ""
        }

        fetchPostData('/Filter_All_Clients', request)
            .then(response => {
                if (response.success && response?.extras?.Data) {
                    let optionData = response?.extras?.Data;
                    const mappedOptions = optionData.map(item => ({
                        value: item.Client_Code,
                        label: item.EmailID
                    }));
                    setOptions(mappedOptions);
                } else {
                    toast.error(response?.extras?.msg || 'No client data found');
                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'Something went wrong');
            });

    }

    const handleInput = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const request = {
            Role_Type: formData.Role_Type ? parseInt(formData.Role_Type) : formData.Role_Type,
            Name: formData.Name,
            PhoneNumber: formData.PhoneNumber,
            EmailID: formData.EmailID,
            Password: formData.Password,
            Roles: formData.Roles,
            Designation: formData.Designation,
            Whether_All_Clients: formData.Whether_All_Clients,
        }
        if (formData.Role_Type === "2") {
            request.ClientID_Array = selectedOption?.map((item) => item.value)
        } else {
            request.ClientID_Array = ['test']
        }

        const url = props.Selected_AdminID ? '/Update_Admin_Information' : '/Create_Admin_User';

        fetchPostData(url, request)
            .then(response => {
                if (response.success) {
                    toast.success(response.extras.Status || 'Created Successfully')
                    clearForm()
                    setSelectedOption([]);
                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            });
    };

    const clearForm = () => {
        setFormData({
            Role_Type: null,
            Name: '',
            PhoneNumber: '',
            EmailID: '',
            Password: '',
            Whether_All_Clients: false,
            Designation: '',
            Roles: '',
            ClientID_Array: []
        });
    }

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

    const handleSelet = (selectedOption) => {
        setSelectedOption(selectedOption)
    }

    return (
        <div>
            <FormContainer className="form-container">
                <form onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="Role_Type">Type of Admin</FormLabel>
                        <SelectInput id="Role_Type" name="Role_Type" value={formData.Role_Type} onChange={(e) => handleInput('Role_Type', e.target.value)}>
                            <option value="">Select an option</option>
                            <option value={2}>Modular</option>
                            <option value={3}>Independent</option>
                        </SelectInput>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="Name">Name</FormLabel>
                        <Input
                            type="text"
                            id="Name"
                            name="Name"
                            value={formData.Name}
                            onChange={(e) => handleInput('Name', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="Designation">Designation</FormLabel>
                        <Input
                            type="text"
                            id="Designation"
                            name="Designation"
                            value={formData.Designation}
                            onChange={(e) => handleInput('Designation', e.target.value)}
                        />
                    </FormGroup>
                    {formData.Role_Type === '2' &&
                        <FormGroup className="form-group">
                            <FormLabel htmlFor="Designation">Client
                                <ClientCheckbox
                                    type="checkbox"
                                    checked={formData.Whether_All_Clients}
                                    onChange={handleAllClientsCheckboxChange}
                                />
                                All Clients
                            </FormLabel>
                            <Select
                                isMulti
                                value={selectedOption}
                                onChange={handleSelet}
                                options={options}
                            />
                        </FormGroup>
                    }
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="PhoneNumber">Phone Number</FormLabel>
                        <Input
                            type="tel"
                            id="PhoneNumber"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={(e) => handleInput('PhoneNumber', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="EmailID">Email Id</FormLabel>
                        <Input
                            type="email"
                            id="EmailID"
                            name="EmailID"
                            value={formData.EmailID}
                            onChange={(e) => handleInput('EmailID', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="Password">Password</FormLabel>
                        <Input
                            type="password"
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={(e) => handleInput('Password', e.target.value)}
                        />
                    </FormGroup>
                    {formData.Role_Type === '2' &&
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
  margin: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .css-13cymwt-control{
    border-radius: 25px
  }
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
`;

const ClientCheckbox = styled.input`
    margin-left: 20px
`

const SelectInput = styled.select`
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
    &:focus {
        outline: none; 
        border-color: ${colors.primary}; 
    }
    &:hover {
        border-color: ${colors.primary}; 
    }
    margin-right: 10px 
   `;

const Input = styled.input`
    width: 92%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
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
