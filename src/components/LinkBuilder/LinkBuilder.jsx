import { ErrorMessage, Formik } from "formik";
import { CLoseModal, Container, FormContainer, Input, SubmitButton } from "./LinkBuilder.styled";
import Error from "../Error";

const LinkBuilder = ({isOpen, onClose, onConfirm, builder}) => {

    const handleSubmit = () => {
        onConfirm()
    }

    const initialValues = {
        track: "",
        linkId: "",
        merge: "",
        mark: "",
        type: "",
        copy: "",        
    };

    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Confirmation Modal"
        >   
            <CLoseModal type="button" onClick={onClose}>Close</CLoseModal>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <FormContainer>
                    <Input name="track" type="text" placeholder="Tracking domain" autoComplete="off" required/>
                    <ErrorMessage name="track">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="linkId" type="text" placeholder="Redirect ID / Link ID" autoComplete="off" required/>
                    <ErrorMessage name="linkId">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="merge" type="text" placeholder="Email Merge Tag" autoComplete="off" required/>
                    <ErrorMessage name="merge">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="mark" type="text" placeholder="Code Mark" autoComplete="off" required/>
                    <ErrorMessage name="mark">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="track" type="type" placeholder="Type of email" autoComplete="off" required/>
                    <ErrorMessage name="type">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="track" type="copy" placeholder="Copy Code" autoComplete="off" required/>
                    <ErrorMessage name="copy">{msg => <Error msg={msg} />}</ErrorMessage>

                    <SubmitButton type="submit">Submit</SubmitButton>
                </FormContainer>
            </Formik>
        </Container>
    )
};

export default LinkBuilder;

// 1 – Трекінг Домен  2 – Redirect ID / Link ID 3 – Email Merge Tag 4 – код марк 5 – вид емейл 6 – абревіатура копії