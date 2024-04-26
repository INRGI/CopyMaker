
import { Formik, Form } from 'formik';

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BtnBack, Container, CopyButton, Input, ResultContainer, ResultText, SubmitButtonDownload, Title, TitleContainer } from './MakeUniqueModal.styled';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import makeUnique from '../../helpers/makeUnique';

const MakeUniqueModal = ({ isOpen, onClose }) =>{
    const [submitedResult, setSubmitedResult] = useState("");

    const initialValues = {
        textToChange: "",       
    };

    const handleSubmit = ({textToChange}) => {
        setSubmitedResult(makeUnique(textToChange))
        toast.success('Your text changed', {
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

    const handleClose = () => {
        setSubmitedResult("");
        onClose();
    };

    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Edit Confirmation Modal"
        >
            <TitleContainer><Title>Anti Spam v1.0</Title>
                <BtnBack type="button" onClick={onClose}><IoMdClose size={26}/></BtnBack>
                
            </TitleContainer> 
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                    <Input name="textToChange" type="text" placeholder="Your text to transform paste here" required/>
                    
                    <SubmitButtonDownload type="submit">Submit</SubmitButtonDownload>

                    {submitedResult && (
                        <div>
                            <ResultContainer>
                                <ResultText>{submitedResult}</ResultText>
                                <CopyButton onClick={() => {navigator.clipboard.writeText(submitedResult)}} type="button">Copy</CopyButton>
                            </ResultContainer>
                        </div>
                    )}
                </Form>
            </Formik>
        </Container>
    )
};

export default MakeUniqueModal;