import styled from 'styled-components';
import { useState } from 'react';
import Modal from 'react-modal';
import colors from './colors';



// Styled components for BookingManagement
const Container = styled.div`
    width: 95%;
    align-self: center;
    margin-top: 20px;
    align-items: center;
    flex-direction: column;
    display: flex;
`;



const TableContainer = styled.div`
  width: 100%;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableHeaderCell = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TableFooter = styled.div`
  background-color: #f7f7f7;
  height: 18px;
  margin-left: 3%;
  margin-right: 3%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Text = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    max-width: 150px;
    margin-top: 30px;
`;

const MaxWidthPopup = styled(Modal)`
  .content {
    max-width: 90%;
    margin: auto;
    background-color: ${colors.white};
    border-radius: 8px;
    padding: 20px;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: ${colors.black};
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  flex: 1;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RadioButton = styled.input`
  margin-right: 5px;
`;


const StyledCancelButton = styled(Button)`
  background-color: red;

  &:hover {
    background-color: ${colors.redDark};
  }
`;
const BookingManagement = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const options = [{ value: 'option1', title: 'Option 1', description: 'Description for Option 1' }, { value: 'option2', title: 'Option 2', description: 'Description for Option 2' }];

    const MaxWidthPopup = ({ isOpen, onClose, children }) => {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                shouldCloseOnOverlayClick={false}
                contentLabel="Max Width Popup"
                style={{
                    content: {
                        maxWidth: '90%',
                        margin: 'auto',
                        backgroundColor: '#f7f7f7',
                    },
                }}
            >
                {children}
            </Modal>
        );
    };

    return (
        <Container>
            <MaxWidthPopup isOpen={isPopupOpen} onClose={closePopup}>
                <SectionContainer>
                    <Title>Create Booking</Title>
                    <InputContainer>
                        <label>Title:</label>
                        <TextInput placeholder="Enter Title" />
                    </InputContainer>
                    <InputContainer>
                        <label>Description:</label>
                        <TextArea placeholder="Enter Your Description" rows={3} />
                    </InputContainer>
                    <h4>When You are available for this booking?</h4>
                    <RadioButtonContainer>
                        {options.map((option) => (
                            <RadioButtonLabel key={option.value}>
                                <RadioButton
                                    type="radio"
                                    value={option.value}
                                    checked={selectedOption === option.value}
                                    onChange={() => handleOptionChange(option.value)}
                                />
                                {option.title} - {option.description}
                            </RadioButtonLabel>
                        ))}
                    </RadioButtonContainer>
                    <div>
                        <Button onClick={closePopup}>Create Booking</Button>
                        <StyledCancelButton onClick={closePopup}>Cancel</StyledCancelButton>
                    </div>
                </SectionContainer>
            </MaxWidthPopup>

            <Title>Booking Management</Title>
            <TableContainer>
                <TableRow>
                    <TableHeaderCell flex={0.3} borderRadius="top-left"><Text>S.no</Text></TableHeaderCell>
                    <TableHeaderCell flex={0.4}><Text>Id</Text></TableHeaderCell>
                    <TableHeaderCell flex={1}><Text>Name</Text></TableHeaderCell>
                    <TableHeaderCell flex={1}><Text>Phone</Text></TableHeaderCell>
                    <TableHeaderCell flex={1}><Text>Email</Text></TableHeaderCell>
                    <TableHeaderCell flex={0.4}><Text>Type</Text></TableHeaderCell>
                    <TableHeaderCell flex={0.3} borderRadius="top-right"><Text>Status</Text></TableHeaderCell>
                </TableRow>
                <TableFooter />
            </TableContainer>

            <Button onClick={openPopup}>Create Booking</Button>
        </Container>
    );
};

export default BookingManagement;
