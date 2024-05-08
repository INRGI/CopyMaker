import { ErrorMessage, Formik } from "formik";
import { ButtonContainer, CLoseModal, Container, FormContainer, Input, SubmitButton } from "./LinkBuilder.styled";
import Error from "../Error";

const LinkBuilder = ({isOpen, onClose, onConfirm, link}) => {

    const handleSubmit = (values) => {
        const {link} = values;

        onConfirm()
    }

    const initialValues = {
        link: link,    
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
                    <Input name="link" type="text" placeholder="Your link here" autoComplete="off" required/>
                    <ErrorMessage name="link">{msg => <Error msg={msg} />}</ErrorMessage>

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