import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage, Form } from 'formik';
import Error from "../Error";
import { ButtonNo, ButtonYes, ButtonsContainer, Container, Input, Title } from './EditModal.styled';
import { editDomain } from '../../redux/domainSlice';

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectVisibleDomains } from "../../redux/selectors";

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Please enter a name")
});

const EditModal = ({ isOpen, onClose, onConfirm, domain }) => {
    const domains = useSelector(selectVisibleDomains);
    const initialValues = {
        name: domain ? domain.name : ''
    }

    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        const isDomain = domains.some(
            ({ name }) => name.toLowerCase() === values.name.toLowerCase()
        );

        if (isDomain) {
            toast.error(`${values.name} already in domains!`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        dispatch(editDomain({ id: domain.id, values: values }));
        actions.resetForm();
        onConfirm();
        toast.success('Domain successfully updated', {
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
            <Title>Edit domain</Title>
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
                        <ButtonYes type="submit">Save</ButtonYes>
                        <ButtonNo onClick={onClose}>Back</ButtonNo>
                    </ButtonsContainer>
                </Form>
            </Formik>
        </Container>
    );
};

export default EditModal;