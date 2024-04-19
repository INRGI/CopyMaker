import { ButtonNo, ButtonYes, ButtonsContainer, Container, Input, Title } from './AddImageModal.styled';
import { Formik, ErrorMessage, Form } from 'formik';
import Error from "../Error";
import * as Yup from "yup";

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Please enter a name")
});

const AddImageModal = ({isOpen, onClose, result, onConfirm}) =>{

    const initialValues = {};

    const handleSubmit = () => {};


    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add image to copy"
        >
            <Title>Add Image</Title>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                    <Input name="name" type="text" placeholder="Domain name" />
                    <ErrorMessage name="name">{msg => <Error msg={msg} />}</ErrorMessage>

                    <ButtonsContainer>
                        <ButtonYes type="submit">Add</ButtonYes>
                        <ButtonNo onClick={onClose}>Back</ButtonNo>
                    </ButtonsContainer>
                </Form>
            </Formik>
        </Container>
    )
};

export default AddImageModal;