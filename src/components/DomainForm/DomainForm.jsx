import { Formik, Field, Form } from 'formik';
import { ErrorMessage } from "formik";
import { nanoid } from 'nanoid';
import * as Yup from "yup";
import { Button, Container, Input, Title } from './DomainForm.styled';
import Error from '../Error/Error';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addDomain } from '../../redux/domainSlice';
import { getDomains } from '../../redux/selectors';

const initialValues = {
    name: "",
};

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
});

const DomainForm = () => {
    const nameId = nanoid();
    const dispatch = useDispatch();
    const domains = useSelector(getDomains);

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


        dispatch(addDomain(values));

        toast.success('Domain added', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        actions.resetForm();
    };

    return (
        <>
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit} 
                validationSchema={FeedbackSchema} 
                validateOnBlur={false}
                validateOnChange={false}>
                <Form>
                    <Container>
                        <Title>Add Domain</Title>
                        <Field as={Input} type="text" name="name" id={nameId} placeholder="Name"/>

                        <ErrorMessage name="name">{msg => <Error msg={msg} />}</ErrorMessage>
                        <Button type='submit'>Add</Button>
                    </Container>
                </Form>
            </Formik>
            <ToastContainer />
        </>
    );
};


export default DomainForm;