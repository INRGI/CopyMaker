
import { Formik, Form, Field } from 'formik';

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BtnBack, ButtonContainer, Container, CopyButton, MuiInput, ResultContainer, ResultText, SubmitButtonDownload, Title, TitleContainer } from './ImportDomainModal.styled';
import { useState } from 'react';
import makeUnique from '../../helpers/makeUnique';
import { nanoid } from 'nanoid';

const ImportDomainModal = ({ isOpen, onClose }) =>{
    const [submitedResult, setSubmitedResult] = useState("");

    const inputId = nanoid()

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
            <TitleContainer>
                <Title>Anti Spam v1.0</Title>
                
                
            </TitleContainer> 
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                    <Field fullWidth as={MuiInput} label="Your text" size="small" variant="outlined" type="text" name="textToChange" id={inputId} placeholder="Your text to transform paste here" required autoComplete="off" />
                    <ButtonContainer>
                        <BtnBack type="button" onClick={onClose}>Cancel</BtnBack>
                        <SubmitButtonDownload type="submit">Submit</SubmitButtonDownload>   
                    </ButtonContainer>
                    

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

export default ImportDomainModal;