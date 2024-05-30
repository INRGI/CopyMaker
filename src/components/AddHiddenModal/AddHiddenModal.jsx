import { ButtonNo, ButtonYes, ButtonsContainer, Container, InputContainer, MuiInput, Title, ContentContainer } from './AddHiddenModal.styled';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import Error from "../Error";
import * as Yup from "yup";

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import customHiddenBlock from '../../helpers/customHiddenBlock';
import randomSentence from '../../helpers/randomSentenсe.js'
import { Checkbox } from '@mui/material';
import { useState } from 'react';



const FeedbackSchema = Yup.object().shape({
    quantity: Yup.number().min(1, "Too Short!").max(100000, "Too Long!").required("Please enter quantity")
});

const AddHiddenModal = ({isOpen, onClose, result, onConfirm}) =>{
    const [isChecked, setChecked] = useState(false)

    const initialValues = {
        quantity: "",   
    };

    const handleSubmit = (values) => {
        const { quantity } = values;
       
        if (isChecked){
            const response =  customHiddenBlock(result, quantity);
            onConfirm(response);
            toast.success('Hidden Block successfully added', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            const response =  randomSentence(result, quantity);
            onConfirm(response);
            toast.success('Hidden Block successfully added', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        
        
    };


    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add hidden block to copy"
        >
            
            <Title>Add Hidden Block</Title>
            <ContentContainer>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                
                    <InputContainer>
                        <Checkbox checked={isChecked} onChange={() => setChecked((prev) => !prev)} color="success" />
                        <p>Random symbols</p>

                        <Checkbox checked={!isChecked} onChange={() => setChecked((prev) => !prev)} color="success" />
                        <p>Random words</p>

                    </InputContainer>
                    <Field fullWidth as={MuiInput} name="quantity" type="text" label="Quantity of symbols" placeholder="Quantity of symbols" autoComplete="off" required/>
                    <ErrorMessage name="quantity">{msg => <Error msg={msg} />}</ErrorMessage>
                    <ButtonsContainer>
                        <ButtonYes type="submit">Add</ButtonYes>
                        <ButtonNo onClick={onClose}>Back</ButtonNo>
                    </ButtonsContainer>
                </Form>
            </Formik>
            </ContentContainer>
        </Container>
    )
};

export default AddHiddenModal;