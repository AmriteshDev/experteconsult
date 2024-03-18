import styled from 'styled-components';
import colors from './colors';
import { useState } from 'react';
import { fetchPostData } from '../helper/helper';
import { toast } from 'react-toastify';


const Pricing = ({ setTab }) => {

    const [formData, setFormData] = useState({
        lable1: "",
        price: "",
        lable2: "",
        offerPrice: "",

    })

    const handleForm = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            price: formData.price,
            lable1: formData.lable1,
            lable2: formData.lable2,
            offerPrice: formData.offerPrice,
        };

        fetchPostData('/Create_Client_Booking_Management', request)
            .then(response => {
                if (response.success) {
                    toast.success(response.extras.Status || 'Added Successfully');
                    console.log("request===>", response)
                }
            })
            .catch(error => {
                toast.error(error?.response?.data?.extras.msg || 'something went wrong');
            });
    };

    return (
        <Container>
            <FormContainer>
                <Title>Pricing</Title>

                <FormGroup>
                    <Label htmlFor="label1">Label 1:</Label>
                    <Input id="label1" name="lable1" value={formData.lable1} onChange={(e) => handleForm("lable1", e.target.value)} type="text" placeholder="Label 1" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="price">Price:</Label>
                    <Input id="price" name='price' value={formData.price} onChange={(e) => handleForm("price", e.target.value)} type="number" placeholder="00.0" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="label2">Label 2:</Label>
                    <Input id="label2" name="lable2" value={formData.lable2} onChange={(e) => handleForm("lable2", e.target.value)} type="text" placeholder="Label 2" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="offerPrice">Offer Price:</Label>
                    <Input id="offerPrice" name='offerPrice' value={formData.offerPrice} onChange={(e) => handleForm("offerPrice", e.target.value)} type="number" placeholder="00" />
                </FormGroup>
                <Button onClick={handleSave}>Save</Button>
            </FormContainer>
        </Container>
    );
};

export default Pricing;



const Container = styled.div`
    width: 95%;
    margin: 20px auto;
    align-items: center;
    flex-direction: column;
    display: flex;
`;

const Title = styled.h1`
    color: ${colors.black};
        font-size: 32px;

`;

const FormContainer = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Label = styled.label`
    text-align: left;
    margin-bottom: 5px;
    color: ${colors.black};
    font-size: 14px; /* Adjust font size */
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px; /* Adjust font size */
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px; /* Adjust font size */
`;

const Button = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    max-width: 150px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px; /* Adjust font size */
`;
