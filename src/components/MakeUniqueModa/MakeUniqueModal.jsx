
import { Formik, Form } from 'formik';

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BtnBack, Container, Input, Title } from './MakeUniqueModal.styled';


const MakeUniqueModal = ({ isOpen, onClose }) =>{

    const initialValues = {
        textToChange: "",       
    };


    const handleSubmit = () => {
        
        toast.success('', {
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
            contentLabel="Edit Confirmation Modal"
        >
            <Title>Anti Spam v1.0</Title>
            <BtnBack type="button">Back</BtnBack>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                    <Input name="textToChange" type="text" placeholder="Your text to transform paste here" />

                </Form>
            </Formik>
        </Container>
    )
};

export default MakeUniqueModal;