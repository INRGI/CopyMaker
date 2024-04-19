
import { useState } from "react";
import { Formik } from 'formik';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { editDomain } from "../../redux/domainSlice";
import { AddImageButton, CheckBoxContainer, Container, CopyButton, FormContainer, FormInput, HasImagesContainer, ImageBlock, ImageContaianer, ImageToDowload, InputContainer, InputToDowload, Label, LabelCheckBox, LinkToDownload, ResultContainer, ResultText, ResultTitle, SubmitButtonDownload, SubmitContainer, SubmitInput, TitleImages } from "./FormPromo.styled";
import { GrDownload } from "react-icons/gr";
import { BsCopy } from "react-icons/bs";

import AddImageModal from "../AddImageModal";
import Checkbox from '@mui/material/Checkbox';
import makeCopy from "../../helpers/makeCopy";
import { Bounce, toast } from "react-toastify";

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
    const [isTrTB, setTrTB] = useState(domain.isTrTB);
    const [isBGColor, setBGColor] = useState(domain.isBGColor);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitedResult, setSubmitedResult] = useState("");
    
    const [newLinks, setNewLinks] = useState(domain.images ? Array.from({ length: domain.images.length }, () => '') : []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (index, event) => {
        const newLinkCopy = [...newLinks];
        newLinkCopy[index] = event.target.value;
        setNewLinks(newLinkCopy);
    };
    

    const handleImageReplace = (index, newSrc) => {
        const images = submitedResult.match(/<img.*?src=["'](.*?)["'].*?>/g);
        
        if (index >= 0 && index < images.length) {
            const oldSrc = images[index].match(/src=["'](.*?)["']/)[1];
            const updatedResult = submitedResult.replace(oldSrc, newSrc);
            setSubmitedResult(updatedResult);
        }
    };
    
    

    const dispatch = useDispatch();
    const fontSizeId = nanoid();
    const fontFamilyId = nanoid();
    const colorLinkId = nanoid();
    const width = nanoid();
    const paddingLR = nanoid();
    const submitId = nanoid();
    const linkUrlId = nanoid();
    const TrTBId = nanoid();
    const BGColorId = nanoid();

    const hasImages = /<img.*?src=["'](.*?)["'].*?>/g.test(submitedResult);



    const initialValues = {
        fontSize: "",
        fontFamily: "",
        colorLink: "",
        width: "",
        paddingLR: "",
        linkUrl: "",
        trTB: "",
        BGColor: "",
        ...domain,
        submit: "",
      };

    const handleSubmit = (values) => {
        dispatch(editDomain({ id: domainId, values: {...values, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isLinkUrl, isTrTB, isBGColor} }));
        setSubmitedResult(makeCopy({...values, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isLinkUrl, isTrTB, isBGColor}))

        if(values.submit === '') {
            setIsSubmitted(false);
            return
        }

        setIsSubmitted(true);
        toast.success('Copy maked', {
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
    };

    const handleImageAdd = () => {

    };

    const handleAddImageConfirm = () => {

    };

    return (
        <>
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

                            <FormInput type="text" name="fontSize" id={fontSizeId} placeholder="ex: 16" disabled={!isFontSize}/>
                        </InputContainer>

                        <InputContainer>
                            <Label>
                                <Checkbox checked={isFontFamily} onChange={() => setFontFamily((prev) => !prev)} color="success" />
                                Font Family
                            </Label>

                            <FormInput type="text" name="fontFamily" id={fontFamilyId} placeholder="ex: Roboto" disabled={!isFontFamily}/>
                        </InputContainer>

                        <InputContainer>
                            <Label>
                                <Checkbox checked={isColorLink} onChange={() => setColorLink((prev) => !prev)} color="success" />
                                Link Color
                            </Label>

                            <FormInput type="text" name="colorLink" id={colorLinkId} placeholder="ex: #ffffff" disabled={!isColorLink}/>
                        </InputContainer>
                        

                        <InputContainer>
                            <Label>
                                <Checkbox checked={isWidth} onChange={() => setWidth((prev) => !prev)} color="success" />
                                Max Width
                            </Label>

                            <FormInput type="text" name="width" id={width} placeholder="ex: 600" disabled={!isWidth}/>
                        </InputContainer>
                        
                        
                        <InputContainer>
                            <Label>
                                <Checkbox checked={isPaddingLR} onChange={() => setPaddingLR((prev) => !prev)} color="success" />
                                Padding ⬅️➡️
                            </Label>

                            <FormInput type="text" name="paddingLR" id={paddingLR} placeholder="ex: 20" disabled={!isPaddingLR}/>
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
                                <Checkbox checked={isTrTB} onChange={() => setTrTB((prev) => !prev)} color="success" />
                                Padding ⬆️ ⬇️
                            </Label>

                            <FormInput type="text" name="trTB" id={TrTBId} placeholder="ex: 20" disabled={!isTrTB}/>
                        </InputContainer>
                        
                        <InputContainer>
                            <Label>
                                <Checkbox checked={isBGColor} onChange={() => setBGColor((prev) => !prev)} color="success" />
                                Bgcolor
                            </Label>

                            <FormInput type="text" name="BGColor" id={BGColorId} placeholder="ex: #ffffff" disabled={!isBGColor}/>
                        </InputContainer>

                    </Container>

                    <CheckBoxContainer>
                            <LabelCheckBox>
                                <Checkbox checked={isReplace} onChange={() => setReplace((prev) => !prev)} color="success" />
                                Make Unique
                            </LabelCheckBox>
                    </CheckBoxContainer>

                    <SubmitContainer>
                        <SubmitInput autoComplete="off" name="submit" id={submitId} type="text" placeholder="Paste your copy here :)"/>
                        <SubmitButtonDownload type="submit">Submit</SubmitButtonDownload>
                    </SubmitContainer>
                    
                    {/* NEED TO TEST */}
                    {hasImages && submitedResult !== "" && (
                        <HasImagesContainer>
                            <TitleImages>Images found in text. Replace their source:</TitleImages>
                            <ImageContaianer>
                            {submitedResult.match(/<img.*?src=["'](.*?)["'].*?>/g).map((match, index) => {
                                const inputId = `newLink${index}`;
                                return (
                                    <ImageBlock key={index}>
                                        <ImageToDowload src={match.match(/src=["'](.*?)["']/)[1]} alt="Image" />

                                        <LinkToDownload href={match.match(/src=["'](.*?)["']/)[1]} download target="_blank"><GrDownload color="white"/></LinkToDownload>

                                        <InputToDowload autoComplete="off" type="text" placeholder="Paste new link src" value={newLinks[index]} onChange={(event) => handleChange(index, event)} id={inputId} />
                                        <SubmitButtonDownload type="button" onClick={() => handleImageReplace(index, newLinks[index])}>Change</SubmitButtonDownload> 
                                    </ImageBlock>
                                );
                            })}
                            </ImageContaianer>
                        </HasImagesContainer>
                    )}

                    {isSubmitted && !hasImages && (
                        <div>
                            <ResultContainer>
                                <AddImageButton onClick={()=> handleImageAdd(submitedResult)}>Add Image</AddImageButton>
                            </ResultContainer>
                        </div>
                    )}


                    {isSubmitted && (
                        <div>
                            <ResultTitle>Your Copy below</ResultTitle>
                            <ResultContainer>
                                <ResultText>{submitedResult}</ResultText>
                                <CopyButton onClick={() => {navigator.clipboard.writeText(submitedResult)}} type="button"><BsCopy /></CopyButton>
                            </ResultContainer>
                        </div>
                    )}

                    

                    </FormContainer>
                    

                
            </Formik>
            
        {/* <AddImageModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onConfirm={handleAddImageConfirm}
                    result={submitedResult} /> */}
        </>
    )
}

export default FormPromo;

