import { ErrorMessage, Formik } from "formik";
import { ButtonContainer, CLoseModal, Container, FormContainer, Input, SubmitButton } from "./LinkBuilder.styled";
import Error from "../Error";

const LinkBuilder = ({isOpen, onClose, onConfirm}) => {

    const handleSubmit = (values) => {
        const {track, linkId, merge, mark, type, copy} = values;

        const link = `${track}${linkId}${merge}${mark}${type}${copy}`;
        onConfirm()
    }

    const initialValues = {
        track: '',
        linkId: '',
        merge: '',
        mark: '',
        type: '',
        copy: '',        
    };

    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Confirmation Modal"
        >   
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

                    <Input name="type" type="text" placeholder="Type of email" autoComplete="off" required/>
                    <ErrorMessage name="type">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="copy" type="text" placeholder="Copy Code" autoComplete="off" required/>
                    <ErrorMessage name="copy">{msg => <Error msg={msg} />}</ErrorMessage>

                    <ButtonContainer>
                        <CLoseModal type="button" onClick={onClose}>Back</CLoseModal>
                        <SubmitButton type="submit">Apply</SubmitButton>
                    </ButtonContainer>
                    
                </FormContainer>
            </Formik>
        </Container>
    )
};

export default LinkBuilder;

// 1 – Трекінг Домен  2 – Redirect ID / Link ID 3 – Email Merge Tag 4 – код марк 5 – вид емейл 6 – абревіатура копії

// https://tracking.grandinvestingwebinar.com/2d0001db-e38f-44a9-bf32-464f6a45a359?email={{email}}&domain=073GIW&copy=IMG0644_4