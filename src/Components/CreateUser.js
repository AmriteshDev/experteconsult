import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';
import Select from 'react-select';
import colors from './colors';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';

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

function CreateUser({ onSuccess, selectedUserDetails, isOpen, toggle }) {

    const [formData, setFormData] = useState({});
    const [selectedOption, setSelectedOption] = useState(false);
    const [selectedOptionList, setSelectedOptionList] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getClentData();
    }, []);

    useEffect(() => {
        setFormData({
            Role_Type: selectedUserDetails?.Role_Type || '',
            Selected_AdminID: selectedUserDetails?.AdminID || '',
            Name: selectedUserDetails?.Name || '',
            PhoneNumber: selectedUserDetails?.PhoneNumber || '',
            EmailID: selectedUserDetails?.EmailID || '',
            Password: selectedUserDetails?.Password || '',
            Whether_All_Clients: selectedUserDetails?.Whether_All_Clients || false,
            Designation: selectedUserDetails?.Designation || '',
            Roles: selectedUserDetails?.Roles || '',
            ClientID_Array: selectedUserDetails?.ClientID_Array || []
        })


        if (selectedUserDetails?.ClientID_Array && selectedUserDetails?.ClientID_Array.length > 0) {
            const selectedOptions = selectedUserDetails.ClientID_Array.map(clientId => {
                return options.find(option => option.value === clientId);
            }).filter(Boolean);
            setSelectedOptionList(selectedOptions);
        }
    }, [selectedUserDetails])

    const handleAllClientsCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setSelectedOption(isChecked);
        setFormData({
            ...formData,
            Whether_All_Clients: isChecked
        });
    };

    const getClentData = () => {
        const request = {
            "Skip": 0,
            "Limit": 100,
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
            Roles: formData.Roles,
            Designation: formData.Designation,
            Whether_All_Clients: formData.Whether_All_Clients,
        }

        formData?.Selected_AdminID ? request.Selected_AdminID = formData.Selected_AdminID : request.Password = formData.Password

        if (formData.Role_Type === "2" || formData.Role_Type === 2) {
            request.ClientID_Array = selectedOptionList?.map((item) => item.value)
        } else {
            request.ClientID_Array = ['test']
        }

        const url = formData?.Selected_AdminID ? '/Update_Admin_Information' : '/Create_Admin_User';

        fetchPostData(url, request)
            .then(response => {
                if (response.success) {
                    toast.success(response.extras.Status || `${formData?.Selected_AdminID ? "Updated" : "Created"} Successfully`)
                    handleToggle()
                    clearForm()
                    onSuccess()
                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            });
    };

    const clearForm = () => {
        setFormData({});
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
            <label>
                <input
                    className='m-2'
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                {title}
            </label>
        );
    };

    const handleSelect = (selectedOption) => {
        setSelectedOptionList(selectedOption)
    }

    const handleToggle = () => {
        setSelectedOptionList([])
        toggle()
    }

    return (
        <div className='container model-background'>
            <Modal isOpen={isOpen} toggle={handleToggle} centered={true} style={{ maxWidth: '80%', height: '80vh' }}>
                <ModalHeader toggle={handleToggle}>Create User</ModalHeader>
                <ModalBody style={{ maxHeight: '60vh', overflowY: 'auto' }}>
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
                            <Row>
                                <Col md="6">
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
                                </Col>
                                <Col md="6">
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
                                </Col>
                            </Row>
                            {(formData.Role_Type === '2' || formData.Role_Type === 2) &&
                                <FormGroup className="form-group">
                                    <FormLabel htmlFor="Designation"> Client
                                        <Label check>
                                            <ClientCheckbox
                                                type="checkbox"
                                                checked={formData.Whether_All_Clients}
                                                onChange={handleAllClientsCheckboxChange}
                                            />
                                            <span className='px-2' id='all-client'>All Clients</span>
                                        </Label>
                                    </FormLabel>
                                    <Select className={selectedOption ? "d-none" : ""}
                                        isMulti
                                        value={selectedOptionList}
                                        onChange={handleSelect}
                                        options={options}
                                    />
                                </FormGroup>
                            }
                            <Row>
                                <Col md="6">
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
                                </Col>
                                <Col md="6">
                                    <FormGroup className="form-group">
                                        <FormLabel htmlFor="EmailID">Email Id</FormLabel>
                                        <Input
                                            type="email"
                                            id="EmailID"
                                            autoComplete='new-password'
                                            name="EmailID"
                                            value={formData.EmailID}
                                            onChange={(e) => handleInput('EmailID', e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            {
                                !formData?.Selected_AdminID &&
                                <FormGroup className="form-group">
                                    <FormLabel htmlFor="Password">Password</FormLabel>
                                    <Input
                                        type="password"
                                        id="Password"
                                        name="Password"
                                        autoComplete='new-password'
                                        value={formData.Password}
                                        onChange={(e) => handleInput('Password', e.target.value)}
                                    />
                                </FormGroup>
                            }
                            {(formData.Role_Type === '2' || formData.Role_Type === 2) &&
                                <Row>
                                    {roleLabels.map((item, index) => (
                                        <Col xs="6" sm="4" md="3" key={index}>
                                            <Checkbox id={item.id} title={item.title} />
                                        </Col>
                                    ))}
                                </Row>
                            }
                        </form>
                    </FormContainer>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary btn-radus-padding" onClick={handleToggle}>
                        Cancel
                    </Button>{' '}
                    <Button color="primary btn-radus-padding btn-color-success" onClick={handleSubmit}>
                        {formData?.Selected_AdminID ? "Update" : "Create"}
                    </Button>
                </ModalFooter>
            </Modal>
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
`;

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
    width: 100%;
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
