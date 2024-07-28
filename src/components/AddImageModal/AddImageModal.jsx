import { ButtonNo, ButtonYes, ButtonsContainer, Container, Input, Title } from './AddImageModal.styled';
import { Formik, ErrorMessage, Form } from 'formik';
import Error from "../Error";
import * as Yup from "yup";

import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeedbackSchema = Yup.object().shape({
    src: Yup.string().min(3, "Too Short!").max(200, "Too Long!").required("Please enter src")
});

const AddImageModal = ({isOpen, onClose, result, onConfirm}) =>{

    const initialValues = {
        src: "",
        alt: "",
        width: "",    
        padding: "",    
    };

    const regex = /<a\s+(?![^>]*\bclass\s*=\s*["'][^"']*\bbots\b[^"']*["'])[^>]*href=(["'])(.*?)\1/g;
    
    let link = 'urlhere';
    let match;
    while ((match = regex.exec(result)) !== null) {
        link = match[2];
        break;
    }

    // const handleSubmit = (values) => {
    //     const { src, alt, width, padding } = values;
    //     const newImageHTML = `<!-- Here start new image --><table role="presentation" cellpadding="0" cellspacing="0" align="center">
    //         <tr>
    //             <td align="center" style="text-align: center; padding: ${padding}px 0">
    //                 <a href="${link}" style="font-weight: 900; text-decoration: none;;color: #1F51FF;">
    //                     <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border: 0; -ms-interpolation-mode: bicubic; max-width: ${width}px;" width="${width}" height="auto">
    //                 </a>
    //             </td>
    //         </tr>
    //     </table><!-- Here end new image -->`;

    //     const response = newImageHTML + result;

    //     onConfirm(response);
    //     toast.success('Image successfully added', {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         transition: Bounce,
    //     });
    // };


    // IT WORKS BUT WITH BUGs
    // const handleSubmit = (values) => {
    //     const { src, alt, width, padding } = values;
    //     const newImageHTML = `<!-- Here start new image --><table role="presentation" cellpadding="0" cellspacing="0" align="center">
    //         <tr>
    //             <td align="center" style="text-align: center; padding: ${padding}px 0">
    //                 <a href="${link}" style="font-weight: 900; text-decoration: none;color: #1F51FF;">
    //                     <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border: 0; -ms-interpolation-mode: bicubic; max-width: ${width}px;" width="${width}" height="auto">
    //                 </a>
    //             </td>
    //         </tr>
    //     </table><!-- Here end new image -->`;
    
    //     const sentenceEndRegex = /([.!?…]["']?|\b<br\s*\/?>)[\s\r\n]*(?=<br\s*\/?>|<\/?[a-zA-Z\s]*>|$)/i;
    //     const lineBreakRegex = /<br\s*\/?>/i;
    
    //     let response;
    //     let matchResult = lineBreakRegex.exec(result);
    
    //     if (matchResult) {
    //         const beforeBreak = result.substring(0, matchResult.index);
    //         const afterBreak = result.substring(matchResult.index + matchResult[0].length);
    
    //         response = beforeBreak + newImageHTML + afterBreak;
    //     } else {
    //         matchResult = sentenceEndRegex.exec(result);
    
    //         if (matchResult) {
    //             const endPosition = matchResult.index + matchResult[0].length;
    //             const beforeSentenceEnd = result.substring(0, endPosition);
    //             const afterSentenceEnd = result.substring(endPosition);
    
    //             response = beforeSentenceEnd + newImageHTML + afterSentenceEnd;
    //         } else {
    //             response = result + newImageHTML;
    //         }
    //     }
    
    //     onConfirm(response);
    //     toast.success('Image successfully added', {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         transition: Bounce,
    //     });
    // };
    
    const handleSubmit = (values) => {
        const { src, alt, width, padding } = values;
        const newImageHTML = `<!-- Here start new image --><table role="presentation" cellpadding="0" cellspacing="0" align="center">
            <tr>
                <td align="center" style="text-align: center; padding: ${padding}px 0">
                    <a href="${link}" style="font-weight: 900; text-decoration: none;color: #1F51FF;">
                        <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border: 0; -ms-interpolation-mode: bicubic; max-width: ${width}px;" width="${width}" height="auto">
                    </a>
                </td>
            </tr>
        </table><!-- Here end new image -->`;
    
        const sentenceEndRegex = /([.!?…]["']?|\b<br\s*\/?>)[\s\r\n]*(?=<br\s*\/?>|<\/?[a-zA-Z\s]*>|$)/i;
        const lineBreakRegex = /<br\s*\/?>/i;
    
        let response;
        let matchResult = lineBreakRegex.exec(result);
    
        if (matchResult) {
            const beforeBreak = result.substring(0, matchResult.index);
            const afterBreak = result.substring(matchResult.index + matchResult[0].length).replace(/^\s*<\/?br\s*\/?>\s*/gi, '');
    
            response = beforeBreak + newImageHTML + afterBreak;
        } else {
            matchResult = sentenceEndRegex.exec(result);
    
            if (matchResult) {
                const endPosition = matchResult.index + matchResult[0].length;
                const beforeSentenceEnd = result.substring(0, endPosition);
                const afterSentenceEnd = result.substring(endPosition).replace(/^\s*<\/?br\s*\/?>\s*/gi, '');
    
                response = beforeSentenceEnd + newImageHTML + afterSentenceEnd;
            } else {
                response = result + newImageHTML;
            }
        }
    
        onConfirm(response);
        toast.success('Image successfully added', {
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
            <Title>Add Image</Title>
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

                    <Input name="padding" type="text" placeholder="Padding top/bottom" />
                    <ErrorMessage name="padding">{msg => <Error msg={msg} />}</ErrorMessage>

                    <ButtonsContainer>
                        <ButtonYes type="submit">Add</ButtonYes>
                        <ButtonNo onClick={onClose}>Back</ButtonNo>
                    </ButtonsContainer>
                </Form>
            </Formik>
        </Container>
    )
};

export default AddImageModal;