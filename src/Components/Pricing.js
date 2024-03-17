import styled from 'styled-components';
import colors from './colors'; // Importing colors from the colors.js file

// Styled components for Pricing
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

const Pricing = ({ setTab }) => {

    return (
        <Container>
            <FormContainer>
                <Title>Pricing</Title>

                <FormGroup>
                    <Label htmlFor="label1">Label 1:</Label>
                    <Input id="label1" type="text" placeholder="Label 1" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="price">Price:</Label>
                    <Input id="price" type="text" placeholder="00.0" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="label2">Label 2:</Label>
                    <Input id="label2" type="text" placeholder="Label 2" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="offerPrice">Offer Price:</Label>
                    <Input id="offerPrice" type="text" placeholder="00" />
                </FormGroup>
                <Button onClick={() => { setTab(7) }}>Save</Button>
            </FormContainer>
        </Container>
    );
};

export default Pricing;
