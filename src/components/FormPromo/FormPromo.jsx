
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
    const [isColorLink, setColorLink] = useState(domain.isColorLink);
    const [isWidth, setWidth] = useState(domain.isWidth);
    const [isPaddingLR, setPaddingLR] = useState(domain.isPaddingLR);
    const [isReplace, setReplace] = useState(domain.isReplace);
    const [isLinkUrl, setLinkUrl] = useState(domain.isLinkUrl);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitedResult, setSubmitedResult] = useState("");
    

    const dispatch = useDispatch();
    const fontSizeId = nanoid();
    const fontFamilyId = nanoid();
    const colorLinkId = nanoid();
    const width = nanoid();
    const paddingLR = nanoid();
    const submitId = nanoid();
    const linkUrlId = nanoid();

    const initialValues = {
        fontSize: "",
        fontFamily: "",
        colorLink: "",
        width: "",
        paddingLR: "",
        linkUrl: "",
        ...domain,
        submit: "",
      };

    const handleSubmit = (values) => {
        dispatch(editDomain({ id: domainId, values: {...values, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isLinkUrl} }));
        setSubmitedResult(makeCopy({...values, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isLinkUrl}))

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

                        <FormInput type="text" name="fontFamily" id={fontFamilyId} placeholder="Font Family" disabled={!isFontFamily}/>
                    </InputContainer>

                    <InputContainer>
                        <Label>
                            <Checkbox checked={isColorLink} onChange={() => setColorLink((prev) => !prev)} color="success" />
                            Link Color
                        </Label>

                        <FormInput type="text" name="colorLink" id={colorLinkId} placeholder="Link Color" disabled={!isColorLink}/>
                    </InputContainer>

                    <InputContainer>
                        <Label>
                            <Checkbox checked={isWidth} onChange={() => setWidth((prev) => !prev)} color="success" />
                            Width
                        </Label>

                        <FormInput type="text" name="width" id={width} placeholder="Width" disabled={!isWidth}/>
                    </InputContainer>

                    <InputContainer>
                        <Label>
                            <Checkbox checked={isPaddingLR} onChange={() => setPaddingLR((prev) => !prev)} color="success" />
                            Padding Left & Right
                        </Label>

                        <FormInput type="text" name="paddingLR" id={paddingLR} placeholder="Padding Left & Right" disabled={!isPaddingLR}/>
                    </InputContainer>
                    
                    <InputContainer>
                        <Label>
                            <Checkbox checked={isLinkUrl} onChange={() => setLinkUrl((prev) => !prev)} color="success" />
                            Link Url
                        </Label>

                        <FormInput type="text" name="linkUrl" id={linkUrlId} placeholder="Link Url" disabled={!isLinkUrl}/>
                    </InputContainer>

                    <InputContainer>
                        <Label>
                            <Checkbox checked={isReplace} onChange={() => setReplace((prev) => !prev)} color="success" />
                            Make Unique
                        </Label>
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


// +Font size, +Font family, +color link, +paddings, +width,

{/* <div width="600" style="font-size:16px; color:#aaaaaa; font-family:Roboto; max-width:600px; padding-left:20px; padding-right:20px;">
My client intends to invest these funds in projects. I am willing to finance projects at a guaranteed 5% ROI per annum for projects ranging from 2 years term and above but not exceeding 12 years.
  
  Please answer ASAP.
<a href="urlhere" style="font-size:16px; color:#aaaaaa; font-family:Roboto;">
<img src="osfahofhasoihfoihf" width="600"/>
</a>
<span style="font-family:Roboto; color:white">  Dear friend,
  
  I am a Financial Consultant in control of privately owned funds placed for long term investments.
</span></div> */}