
import { useState } from "react";
import { Field, Formik } from 'formik';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { editDomain } from "../../redux/domainSlice";
import { AddImageButton, CheckBoxContainer, Container, CopyButton, FormContainer, FuncContainer, HasImagesContainer, HiddenImageButton, ImageBlock, ImageContaianer, ImageToDowload, InputContainer, InputToDowload, LabelCheckBox, LinkToDownload, MuiInput, PageContainer, ResultContainer, ResultText, ResultTitle, SubmitButtonDownload, SubmitContainer, TitleImages } from "./FormPromo.styled";
import { GrDownload } from "react-icons/gr";
import { BsCopy } from "react-icons/bs";

import AddImageModal from "../AddImageModal";
import Checkbox from '@mui/material/Checkbox';
import makeCopy from "../../helpers/makeCopy";
import { Bounce, toast } from "react-toastify";
import InfoButton from "../InfoButton/InfoButton";
import Preview from "../Preview/Preview";
import AddHiddenModal from "../AddHiddenModal/AddHiddenModal";

const FormPromo = () => {
    const { domainId } = useParams();
    const domain = useSelector(state => state.domains.find(domain => domain.id === domainId));

    const [isFontSize, setFontSize] = useState(domain.isFontSize);
    const [isFontFamily, setFontFamily] = useState(domain.isFontFamily);
    const [isColorLink, setColorLink] = useState(domain.isColorLink);
    const [isWidth, setWidth] = useState(domain.isWidth);
    const [isPaddingLR, setPaddingLR] = useState(domain.isPaddingLR);
    const [isReplace, setReplace] = useState(domain.isReplace);
    const [isDeleteLift, setDeleteLift] = useState(domain.isDeleteLift);
    const [isLinkUrl, setLinkUrl] = useState(domain.isLinkUrl);
    const [isTrTB, setTrTB] = useState(domain.isTrTB);
    const [isBGColor, setBGColor] = useState(domain.isBGColor);
    const [isAddHidden, setAddHidden] = useState(domain.isAddHidden);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitedResult, setSubmitedResult] = useState("");
    
    const [newLinks, setNewLinks] = useState(domain.images ? Array.from({ length: domain.images.length }, () => '') : []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHiddenModalOpen, setHiddenModalOpen] = useState(false);

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
        linkUrl: '',
        trTB: "",
        BGColor: "",
        ...domain,
        submit: "",
      };

    const handleSubmit = (values) => {
        dispatch(editDomain({ id: domainId, values: {...values, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isLinkUrl, isTrTB, isBGColor, isDeleteLift, isAddHidden} }));
        setSubmitedResult(makeCopy({...values, isFontSize, isFontFamily, isColorLink, isWidth, isPaddingLR, isReplace, isLinkUrl, isTrTB, isBGColor, isDeleteLift, isAddHidden}))

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
        setIsModalOpen(true);
    };

    const handleHiddenModal = () => {
        setHiddenModalOpen(true);
    };

    const handleAddImageConfirm = (response) => {
        setSubmitedResult(response);
       
        setIsModalOpen(false);
    };

    const handleHiddenModalConfirm = (response) => {
        setSubmitedResult(response);
       
        setHiddenModalOpen(false);
    }

    return (
        <PageContainer>
            <FuncContainer>
                <CheckBoxContainer>
                            <LabelCheckBox>
                                <Checkbox checked={isReplace} onChange={() => setReplace((prev) => !prev)} color="success" />
                                AntiSpam
                                <InfoButton  text="Replace the symbols against the spam checker"/>
                            </LabelCheckBox>
                            <LabelCheckBox>
                                <Checkbox checked={isDeleteLift} onChange={() => setDeleteLift((prev) => !prev)} color="success" />
                                Delete lift
                                <InfoButton  text="Remove text before copy(lift text)"/>
                            </LabelCheckBox>   
                            <LabelCheckBox>
                                <Checkbox checked={isAddHidden} onChange={() => setAddHidden((prev) => !prev)} color="success" />
                                HiddenBlocks
                                <InfoButton  text="Please be carefull using this function!!! Add hiden unique block to start and end (each one contain 1000 random symbols)"/>
                            </LabelCheckBox>         
                            <ResultContainer>
                            
                            </ResultContainer>
                </CheckBoxContainer>
                <AddImageButton type="button" onClick={()=> handleImageAdd(submitedResult)}>Add Image</AddImageButton>

                <HiddenImageButton type="button" onClick={()=> handleHiddenModal(submitedResult)}>Custom Block</HiddenImageButton>
            </FuncContainer>

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <FormContainer>
                    <Container>
                        <InputContainer>

                            <Checkbox checked={isFontSize} onChange={() => setFontSize((prev) => !prev)} color="success" />

                            <Field fullWidth as={MuiInput} label="Font Size" size="small" variant="outlined" type="text" name="fontSize" id={fontSizeId} placeholder="ex: 16" disabled={!isFontSize} required ></Field>

                            <InfoButton  text="Please paste Font Size value without px"/>
                        </InputContainer>

                        <InputContainer>

                            <Checkbox checked={isFontFamily} onChange={() => setFontFamily((prev) => !prev)} color="success" />
                            <Field fullWidth as={MuiInput} label="Font Family" size="small" variant="outlined" type="text" name="fontFamily" id={fontFamilyId} placeholder="ex: Roboto" disabled={!isFontFamily} required ></Field>

                            <InfoButton  text="Please paste Font Family value here"/>
                        </InputContainer>

                        <InputContainer>

                            <Checkbox checked={isColorLink} onChange={() => setColorLink((prev) => !prev)} color="success" />
                            <Field fullWidth as={MuiInput} label="Link Color" size="small" variant="outlined" type="text" name="colorLink" id={colorLinkId} placeholder="ex: #ffffff" disabled={!isColorLink} required ></Field>

                            <InfoButton  text="Please paste Link Color like this #ffffff"/>
                        </InputContainer>
                        

                        <InputContainer>

                            <Checkbox checked={isWidth} onChange={() => setWidth((prev) => !prev)} color="success" />
                            <Field fullWidth as={MuiInput} label="Max Width" size="small" variant="outlined" type="text" name="width" id={width} placeholder="ex: 600" disabled={!isWidth} required ></Field>

                            <InfoButton  text="Please paste Width value without px"/>
                        </InputContainer>
                        
                        
                        <InputContainer>

                            <Checkbox checked={isPaddingLR} onChange={() => setPaddingLR((prev) => !prev)} color="success" />
                            <Field fullWidth as={MuiInput} label="Padding ⬅️ ➡️" size="small" variant="outlined" type="text" name="paddingLR" id={paddingLR} placeholder="ex: 20" disabled={!isPaddingLR} required ></Field>

                            <InfoButton  text="Please paste Padding value without px"/>
                        </InputContainer>
                        
                        <InputContainer>

                            <Checkbox checked={isLinkUrl} onChange={() => setLinkUrl((prev) => !prev)} color="success" />
                            <Field fullWidth as={MuiInput} label="Link Url" size="small" variant="outlined" type="text" name="linkUrl" id={linkUrlId} placeholder="Link Url" disabled={!isLinkUrl} required ></Field>

                            <InfoButton  text="Please paste Link Address here"/>
                        </InputContainer>
                        
                        <InputContainer>

                            <Checkbox checked={isTrTB} onChange={() => setTrTB((prev) => !prev)} color="success"/>
                            <Field fullWidth as={MuiInput} label="Padding ⬆️ ⬇️" size="small" variant="outlined" type="text" name="trTB" id={TrTBId} placeholder="ex: 20" disabled={!isTrTB} required ></Field>

                            <InfoButton  text="Please paste Padding value without px"/>
                        </InputContainer>
                        
                        <InputContainer>

                            <Checkbox checked={isBGColor} onChange={() => setBGColor((prev) => !prev)} color="success" />
                            <Field fullWidth as={MuiInput} label="Bgcolor" size="small" variant="outlined" type="text" name="BGColor" id={BGColorId} placeholder="ex: #ffffff" disabled={!isBGColor} required ></Field>

                            <InfoButton  text="Please paste Background Color like this #ffffff"/>
                        </InputContainer>

                    </Container>

                    

                    <SubmitContainer>
                        <Field autoComplete="off" fullWidth as={MuiInput} size="small" variant="outlined" type="text" name="submit" id={submitId} placeholder="Paste your copy here :)" />
                        <SubmitButtonDownload type="submit">Submit</SubmitButtonDownload>
                    </SubmitContainer>
                    
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

                    {(isSubmitted || submitedResult !== "") && (
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
            
            <Preview result={submitedResult} />
            
        <AddImageModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onConfirm={handleAddImageConfirm}
                    result={submitedResult} 
        />

        <AddHiddenModal
                    isOpen={isHiddenModalOpen} 
                    onClose={() => setHiddenModalOpen(false)} 
                    onConfirm={handleHiddenModalConfirm}
                    result={submitedResult} 
        />

        </PageContainer>
    )
}

export default FormPromo;

