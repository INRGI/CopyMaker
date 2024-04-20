import { ButtonNo, ButtonYes, ButtonsContainer, Container, Input, Title } from './AddImageModal.styled';
import { Formik, ErrorMessage, Form } from 'formik';
import Error from "../Error";
import * as Yup from "yup";

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeedbackSchema = Yup.object().shape({
    src: Yup.string().min(3, "Too Short!").max(200, "Too Long!").required("Please enter src")
});

const AddImageModal = ({isOpen, onClose, result, onConfirm}) =>{

    const initialValues = {
        src: "",        
    };

    const handleSubmit = () => {


        
        onConfirm();
        toast.success('Image successfully added', {
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
                    <Input name="src" type="text" placeholder="Image src" />
                    <ErrorMessage name="src">{msg => <Error msg={msg} />}</ErrorMessage>

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