import { Formik, Field } from 'formik';
import { ErrorMessage } from "formik";
import { nanoid } from 'nanoid';
import * as Yup from "yup";
import { Button, Container, FormBlock, Input, Label } from './DomainForm.styled';
import Error from '../Error/Error';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addDomain } from '../../redux/domainSlice';
import { getDomains } from '../../redux/selectors';

const initialValues = {
    name: "",
    fontSize: "",
    fontFamily: "",
};

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    fontSize: Yup.string().min(1, "Too Short!").max(50, "Too Long!"),
    fontFamily: Yup.string().min(1, "Too Short!").max(50, "Too Long!"),
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
        actions.resetForm();
    };

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
                <FormBlock>
                    <Container>
                        <Label htmlFor={nameId}>Name</Label>
                        <Field as={Input} type="text" name="name" id={nameId} />
                        <ErrorMessage name="name">{msg => <Error msg={msg} />}</ErrorMessage>
                    </Container>
                    <Button type='submit'>Add domain</Button>
                </FormBlock>
            </Formik>
            <ToastContainer />
        </>
    );
};


export default DomainForm;