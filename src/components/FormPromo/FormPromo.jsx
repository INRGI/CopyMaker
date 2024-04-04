
import { useState } from "react";
import { Formik } from 'formik';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { editDomain } from "../../redux/domainSlice";
import { Container, FormContainer, FormInput, InputContainer, Label, SubmitInput } from "./FormPromo.styled";


import Checkbox from '@mui/material/Checkbox';
import makeCopy from "../../helpers/makeCopy";

const FormPromo = () => {
    const { domainId } = useParams();
    const domain = useSelector(state => state.domains.find(domain => domain.id === domainId));

    const [isFontSize, setFontSize] = useState(domain.isFontSize);
    const [isFontFamily, setFontFamily] = useState(domain.isFontFamily);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitedResult, setSubmitedResult] = useState("");
    

    const dispatch = useDispatch();
    const fontSizeId = nanoid();
    const fontFamilyId = nanoid();
    const submitId = nanoid();

    const initialValues = {
        fontSize: "",
        fontFamily: "",
        ...domain,
        submit: "",
      };

    const handleSubmit = (values) => {
        dispatch(editDomain({ id: domainId, values: {...values, isFontSize, isFontFamily} }));
        setSubmitedResult(makeCopy({...values, isFontSize, isFontFamily}))

        setIsSubmitted(true);
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validateOnBlur={false}
            validateOnChange={false}
        >
            <FormContainer>
                <Container>
                    <InputContainer>
                        <Label>
                            <Checkbox checked={isFontSize} onChange={() => setFontSize((prev) => !prev)} color="success" />
                            Font Size
                        </Label>

                        <FormInput type="text" name="fontSize" id={fontSizeId} placeholder="fontSize" disabled={!isFontSize}/>
                    </InputContainer>

                    <InputContainer>
                        <Label>
                            <Checkbox checked={isFontFamily} onChange={() => setFontFamily((prev) => !prev)} color="success" />
                            Font Family
                        </Label>

                        <FormInput type="text" name="fontFamily" id={fontFamilyId} placeholder="fontFamily" disabled={!isFontFamily}/>
                    </InputContainer>
                </Container>

                <div>
                    <SubmitInput name="submit" id={submitId} type="text" placeholder="Paste your copy here :)"/>
                    <button type="submit">Submit</button>
                </div>
                
                {isSubmitted && (
                    <div>
                        <p>{submitedResult}</p>
                    </div>
                )}
            
                </FormContainer>
            
        </Formik>
    )
}

export default FormPromo;


// Font size, Font family, color link, paddings, width,

{/* <div style="font-size:16px; color:blue"><span style="font-family:Roboto; color:white">hwaohfsf</span></div> */}