import { ButtonNo, ButtonYes, ButtonsContainer, Container, Input, Title } from './AddHiddenModal.styled';
import { Formik, ErrorMessage, Form } from 'formik';
import Error from "../Error";
import * as Yup from "yup";

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeedbackSchema = Yup.object().shape({
    src: Yup.string().min(3, "Too Short!").max(200, "Too Long!").required("Please enter src")
});

const AddHiddenModal = ({isOpen, onClose, result, onConfirm}) =>{

    const initialValues = {
        src: "",
        alt: "",
        width: "",        
    };

    const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
    
    let link = 'urlhere';
    let match;
    while ((match = regex.exec(result)) !== null) {
        link = match[2];
        break;
    }

    const handleSubmit = (values) => {
        const { src, alt, width } = values;
        const newImageHTML = `<!-- Here start new image --><table role="presentation" cellpadding="0" cellspacing="0" align="center">
            <tr>
                <td align="center" style="text-align: center">
                    <a href="${link}" style="font-weight: 900; text-decoration: none;;color: #1F51FF;">
                        <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border: 0; -ms-interpolation-mode: bicubic; max-width: ${width}px;" width="${width}" height="auto">
                        <br>
                        <br>
                    </a>
                </td>
            </tr>
        </table><!-- Here end new image -->`;

        const response = newImageHTML + result;

        onConfirm(response);
        toast.success('Hidden Block successfully added', {
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
            <Title>Add Hidden Block</Title>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form>
                    <Input name="src" type="text" placeholder="Image src" autoComplete="off"/>
                    <ErrorMessage name="src">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="alt" type="text" placeholder="Alt text" />
                    <ErrorMessage name="alt">{msg => <Error msg={msg} />}</ErrorMessage>

                    <Input name="width" type="text" placeholder="Image width" />
                    <ErrorMessage name="width">{msg => <Error msg={msg} />}</ErrorMessage>

                    <ButtonsContainer>
                        <ButtonYes type="submit">Add</ButtonYes>
                        <ButtonNo onClick={onClose}>Back</ButtonNo>
                    </ButtonsContainer>
                </Form>
            </Formik>
        </Container>
    )
};

export default AddHiddenModal;