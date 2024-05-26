import { ButtonNo, ButtonYes, ButtonsContainer, Container, Input, Title } from './AddHiddenModal.styled';
import { Formik, ErrorMessage, Form } from 'formik';
import Error from "../Error";
import * as Yup from "yup";

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import customHiddenBlock from '../../helpers/customHiddenBlock';


const FeedbackSchema = Yup.object().shape({
    quantity: Yup.number().min(1, "Too Short!").max(100000, "Too Long!").required("Please enter quantity")
});

const AddHiddenModal = ({isOpen, onClose, result, onConfirm}) =>{

    const initialValues = {
        quantity: "",   
    };

    const handleSubmit = (values) => {
        const { quantity } = values;
       

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
    };


    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add hidden block to copy"
        >
            <Title>Add Hidden Block</Title>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                    <Input name="quantity" type="text" placeholder="Quantity symbols" autoComplete="off" required/>
                    <ErrorMessage name="quantity">{msg => <Error msg={msg} />}</ErrorMessage>

                    <ButtonsContainer>
                        <ButtonYes type="submit">Add</ButtonYes>
                        <ButtonNo onClick={onClose}>Back</ButtonNo>
                    </ButtonsContainer>
                </Form>
            </Formik>
        </Container>
    )
};

export default AddHiddenModal;