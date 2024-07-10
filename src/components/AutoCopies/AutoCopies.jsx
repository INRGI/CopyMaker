import { gapi } from "gapi-script";

import { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { editDomain } from "../../redux/domainSlice";
import {
  AddImageButton,
  CheckBoxContainer,
  Container,
  CopyButton,
  FormContainer,
  FuncContainer,
  HasImagesContainer,
  HiddenImageButton,
  ImageBlock,
  ImageContaianer,
  ImageToDowload,
  InputContainer,
  InputToDowload,
  LabelCheckBox,
  LinkToDownload,
  MuiInput,
  PageContainer,
  ResultContainer,
  ResultText,
  ResultTitle,
  SubmitButtonDownload,
  SubmitContainer,
  TitleImages,
} from "./AutoCopies.styled";
import { GrDownload } from "react-icons/gr";
import { BsCopy } from "react-icons/bs";

import AddImageModal from "../AddImageModal";
import Checkbox from "@mui/material/Checkbox";
import makeCopy from "../../helpers/makeCopy";
import { Bounce, toast } from "react-toastify";
import InfoButton from "../InfoButton/InfoButton";
import Preview from "../Preview/Preview";
import AddHiddenModal from "../AddHiddenModal/AddHiddenModal";
import LinkBuilderModal from "../LInkBuilderModal/LInkBuilderModal";

const CLIENT_ID =
  "1042942150757-2q0dlbnb2ti5dhu68nf8bia7eusuj795.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const API_KEY = "AIzaSyA4yHLGzLszaPKPS9upLyRrPtqBPvWVnwQ";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

const AutoCopies = () => {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");

  const { domainId } = useParams();
  const domain = useSelector((state) =>
    state.domains.find((domain) => domain.id === domainId)
  );

  const [isFontSize, setFontSize] = useState(domain?.isFontSize || false);
  const [isFontFamily, setFontFamily] = useState(domain?.isFontFamily || false);
  const [isColorLink, setColorLink] = useState(domain?.isColorLink || false);
  const [isWidth, setWidth] = useState(domain?.isWidth || false);
  const [isPaddingLR, setPaddingLR] = useState(domain?.isPaddingLR || false);
  const [isReplace, setReplace] = useState(domain?.isReplace || false);
  const [isDeleteLift, setDeleteLift] = useState(domain?.isDeleteLift || false);
  const [isLinkUrl, setLinkUrl] = useState(domain?.isLinkUrl || false);
  const [isTrTB, setTrTB] = useState(domain?.isTrTB || false);
  const [isBGColor, setBGColor] = useState(domain?.isBGColor || false);
  const [isAddHidden, setAddHidden] = useState(domain?.isAddHidden || false);
  const [isLineHeight, setLineHeight] = useState(domain?.isLineHeight || false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitedResult, setSubmitedResult] = useState("");

  const [newLinks, setNewLinks] = useState(
    domain.images ? Array.from({ length: domain.images.length }, () => "") : []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHiddenModalOpen, setHiddenModalOpen] = useState(false);
  const [isLinkBuilderOpen, setLinkBuilderOpen] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
          ux_mode: "popup",
          redirect_uri: "https://copy-maker.vercel.app",
        })
        .then(() => {
          gapi.auth2.getAuthInstance().signIn();
        })
        .catch((err) => {
          setError("Failed to initialize Google API client: " + err.message);
        });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const initialValues = {
    fontSize: domain?.fontSize || "",
    fontFamily: domain?.fontFamily || "",
    colorLink: domain?.colorLink || "",
    width: domain?.width || "",
    paddingLR: domain?.paddingLR || "",
    linkUrl: domain?.linkUrl || "",
    trTB: domain?.trTB || "",
    BGColor: domain?.BGColor || "",
    LineHeight: domain?.LineHeight || "",
    ...domain,
    submit: "",
  };

  useEffect(() => {
    if (domain) {
      setFontSize(domain.isFontSize);
      setFontFamily(domain.isFontFamily);
      setColorLink(domain.isColorLink);
      setWidth(domain.isWidth);
      setPaddingLR(domain.isPaddingLR);
      setReplace(domain.isReplace);
      setDeleteLift(domain.isDeleteLift);
      setLinkUrl(domain.isLinkUrl);
      setTrTB(domain.isTrTB);
      setBGColor(domain.isBGColor);
      setAddHidden(domain.isAddHidden);
      setLineHeight(domain.isLineHeight);
      setNewLinks(
        domain.images
          ? Array.from({ length: domain.images.length }, () => "")
          : []
      );
    }
  }, [domain]);

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
  const LineHeightId = nanoid();

  const hasImages = /<img.*?src=["'](.*?)["'].*?>/g.test(submitedResult);

  const handleSubmit = async (values) => {    
    if(values.submit === productName){
      
      dispatch(
        editDomain({
          id: domainId,
          values: {
            ...values,
            submit: submitedResult,
            isFontSize,
            isFontFamily,
            isColorLink,
            isWidth,
            isPaddingLR,
            isReplace,
            isLinkUrl,
            isTrTB,
            isBGColor,
            isDeleteLift,
            isAddHidden,
            isLineHeight,
          },
        })
      );

      if (values.submit === "") {
        setIsSubmitted(false);
        setSubmitedResult("");
        return;
      }

      setSubmitedResult(
        makeCopy({
          ...values,
          submit: submitedResult,
          isFontSize,
          isFontFamily,
          isColorLink,
          isWidth,
          isPaddingLR,
          isReplace,
          isLinkUrl,
          isTrTB,
          isBGColor,
          isDeleteLift,
          isAddHidden,
          isLineHeight,
        })
      );

      setIsSubmitted(true);
      toast.success("Copy maked", {
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
      return;
    }
    setError("");
    try {
      setProductName(values.submit);
      const copyName = productName.match(/[a-zA-Z]+/)[0];
      const liftName = productName.match(/[a-zA-Z]+(\d+)/)[1];

      const productQuery = `name contains '${copyName}' and mimeType = 'application/vnd.google-apps.folder'`;
      let res = await gapi.client.drive.files.list({
        q: productQuery,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      if (res.result.files.length === 0) {
        throw new Error("No product folder found with the specified name.");
      }
      const productFolderId = res.result.files[0].id;

      const subFolderQuery = `'${productFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'HTML+SL'`;

      const subFolderRes = await gapi.client.drive.files.list({
        q: subFolderQuery,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      if (subFolderRes.result.files.length === 0) {
        throw new Error('No "HTML+SL" subfolder found.');
      }
      const subFolderId = subFolderRes.result.files[0].id;

      const liftFolderQuery = `'${subFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'Lift ${liftName}'`;
      const liftFolderRes = await gapi.client.drive.files.list({
        q: liftFolderQuery,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      if (liftFolderRes.result.files.length === 0) {
        throw new Error(`No "Lift ${liftName}" subfolder found.`);
      }
      const liftFolderId = liftFolderRes.result.files[0].id;

      const htmlFileQuery = `'${liftFolderId}' in parents and mimeType = 'text/html'`;
      const fileRes = await gapi.client.drive.files.list({
        q: htmlFileQuery,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });

      if (fileRes.result.files.length === 0) {
        throw new Error("No HTML file found in the specified subfolder.");
      }
      const fileId = fileRes.result.files[0].id;

      const fileContentRes = await gapi.client.drive.files.get({
        fileId,
        alt: "media",
      });

      setSubmitedResult(fileContentRes.body);
      dispatch(
        editDomain({
          id: domainId,
          values: {
            ...values,
            submit: fileContentRes.body,
            isFontSize,
            isFontFamily,
            isColorLink,
            isWidth,
            isPaddingLR,
            isReplace,
            isLinkUrl,
            isTrTB,
            isBGColor,
            isDeleteLift,
            isAddHidden,
            isLineHeight,
          },
        })
      );
      setSubmitedResult(
        makeCopy({
          ...values,
          submit: fileContentRes.body,
          isFontSize,
          isFontFamily,
          isColorLink,
          isWidth,
          isPaddingLR,
          isReplace,
          isLinkUrl,
          isTrTB,
          isBGColor,
          isDeleteLift,
          isAddHidden,
          isLineHeight,
        })
      );
      if (values.submit === "") {
        setIsSubmitted(false);
        return;
      }

      setIsSubmitted(true);
      toast.success("Copy maked", {
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
    } catch (err) {
      setError(err.message);
    }
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
  };

  const handleLinkBuilderConfirm = (response) => {
    setLinkBuilderOpen(false);
  };

  return (
    <PageContainer>
      <FuncContainer>
        <CheckBoxContainer>
          <LabelCheckBox>
            <Checkbox
              checked={isReplace}
              onChange={() => setReplace((prev) => !prev)}
              color="success"
            />
            AntiSpam
            <InfoButton text="Replace the symbols against the spam checker" />
          </LabelCheckBox>
          <LabelCheckBox>
            <Checkbox
              checked={isDeleteLift}
              onChange={() => setDeleteLift((prev) => !prev)}
              color="success"
            />
            Delete lift
            <InfoButton text="Remove text before copy(lift text)" />
          </LabelCheckBox>
          <LabelCheckBox>
            <Checkbox
              checked={isAddHidden}
              onChange={() => setAddHidden((prev) => !prev)}
              color="success"
            />
            HiddenBlocks
            <InfoButton text="Please be carefull using this function!!! Add hiden unique block to start and end (each one contain 1000 random symbols)" />
          </LabelCheckBox>

          <ResultContainer></ResultContainer>
        </CheckBoxContainer>
        <AddImageButton
          type="button"
          onClick={() => handleImageAdd(submitedResult)}
        >
          Add Image
        </AddImageButton>

        <HiddenImageButton
          type="button"
          onClick={() => handleHiddenModal(submitedResult)}
        >
          Custom Block
        </HiddenImageButton>

        <HiddenImageButton
          type="button"
          onClick={() => setLinkBuilderOpen(true)}
        >
          Link Builder
        </HiddenImageButton>
        {/* <FastRedirect />   */}
      </FuncContainer>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ setValues }) => {
          useEffect(() => {
            if (domain) {
              setValues({
                fontSize: domain.fontSize || "",
                fontFamily: domain.fontFamily || "",
                colorLink: domain.colorLink || "",
                width: domain.width || "",
                paddingLR: domain.paddingLR || "",
                linkUrl: domain.linkUrl || "",
                trTB: domain.trTB || "",
                BGColor: domain.BGColor || "",
                LineHeight: domain.LineHeight || "",
              });
            }
          }, [domain, setValues]);

          return (
            <FormContainer>
              <Container>
                <InputContainer>
                  <Checkbox
                    checked={isFontSize}
                    onChange={() => setFontSize((prev) => !prev)}
                    color="success"
                  />

                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Font Size"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="fontSize"
                    id={fontSizeId}
                    placeholder="ex: 16"
                    disabled={!isFontSize}
                    required
                  ></Field>

                  <InfoButton text="Please paste Font Size value without px" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isFontFamily}
                    onChange={() => setFontFamily((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Font Family"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="fontFamily"
                    id={fontFamilyId}
                    placeholder="ex: Roboto"
                    disabled={!isFontFamily}
                    required
                  ></Field>

                  <InfoButton text="Please paste Font Family value here" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isColorLink}
                    onChange={() => setColorLink((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Link Color"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="colorLink"
                    id={colorLinkId}
                    placeholder="ex: #ffffff"
                    disabled={!isColorLink}
                    required
                  ></Field>

                  <InfoButton text="Please paste Link Color like this #ffffff" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isWidth}
                    onChange={() => setWidth((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Max Width"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="width"
                    id={width}
                    placeholder="ex: 600"
                    disabled={!isWidth}
                    required
                  ></Field>

                  <InfoButton text="Please paste Width value without px" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isLineHeight}
                    onChange={() => setLineHeight((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Line Height"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="LineHeight"
                    id={LineHeightId}
                    placeholder="ex: 1.5"
                    disabled={!isLineHeight}
                    required
                  ></Field>

                  <InfoButton text="Please paste Line Height value without px / another symbols after number" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isPaddingLR}
                    onChange={() => setPaddingLR((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Padding ⬅️ ➡️"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="paddingLR"
                    id={paddingLR}
                    placeholder="ex: 20"
                    disabled={!isPaddingLR}
                    required
                  ></Field>

                  <InfoButton text="Please paste Padding value without px" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isLinkUrl}
                    onChange={() => setLinkUrl((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Link Url"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="linkUrl"
                    id={linkUrlId}
                    placeholder="Link Url"
                    disabled={!isLinkUrl}
                    required
                  ></Field>

                  <InfoButton text="Please paste Link Address here" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isTrTB}
                    onChange={() => setTrTB((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Padding ⬆️ ⬇️"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="trTB"
                    id={TrTBId}
                    placeholder="ex: 20"
                    disabled={!isTrTB}
                    required
                  ></Field>

                  <InfoButton text="Please paste Padding value without px" />
                </InputContainer>

                <InputContainer>
                  <Checkbox
                    checked={isBGColor}
                    onChange={() => setBGColor((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="Bgcolor"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="BGColor"
                    id={BGColorId}
                    placeholder="ex: #ffffff"
                    disabled={!isBGColor}
                    required
                  ></Field>

                  <InfoButton text="Please paste Background Color like this #ffffff" />
                </InputContainer>
              </Container>

              <SubmitContainer>
                <Field
                  autoComplete="off"
                  fullWidth
                  as={MuiInput}
                  size="small"
                  variant="outlined"
                  type="text"
                  name="submit"
                  id={submitId}
                  placeholder="Copy Name"
                />
                <SubmitButtonDownload type="submit">
                  Submit
                </SubmitButtonDownload>
              </SubmitContainer>

              {hasImages && submitedResult !== "" && (
                <HasImagesContainer>
                  <TitleImages>
                    Images found in text. Replace their source:
                  </TitleImages>
                  <ImageContaianer>
                    {submitedResult
                      .match(/<img.*?src=["'](.*?)["'].*?>/g)
                      .map((match, index) => {
                        const inputId = `newLink${index}`;
                        return (
                          <ImageBlock key={index}>
                            <ImageToDowload
                              src={match.match(/src=["'](.*?)["']/)[1]}
                              alt="Image"
                            />

                            <LinkToDownload
                              href={match.match(/src=["'](.*?)["']/)[1]}
                              download
                              target="_blank"
                            >
                              <GrDownload color="white" />
                            </LinkToDownload>

                            <InputToDowload
                              autoComplete="off"
                              type="text"
                              placeholder="Paste new link src"
                              value={newLinks[index]}
                              onChange={(event) => handleChange(index, event)}
                              id={inputId}
                            />
                            <SubmitButtonDownload
                              type="button"
                              onClick={() =>
                                handleImageReplace(index, newLinks[index])
                              }
                            >
                              Change
                            </SubmitButtonDownload>
                          </ImageBlock>
                        );
                      })}
                  </ImageContaianer>
                </HasImagesContainer>
              )}

              {(isSubmitted && submitedResult !== "") && (
                <div>
                  <ResultTitle>Your Copy below</ResultTitle>
                  <ResultContainer>
                    <ResultText>{submitedResult}</ResultText>
                    <CopyButton
                      onClick={() => {
                        navigator.clipboard.writeText(submitedResult);
                      }}
                      type="button"
                    >
                      <BsCopy />
                    </CopyButton>
                  </ResultContainer>
                </div>
              )}
            </FormContainer>
          );
        }}
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

      <LinkBuilderModal
        isOpen={isLinkBuilderOpen}
        onClose={() => setLinkBuilderOpen(false)}
        onConfirm={handleLinkBuilderConfirm}
      />
    </PageContainer>
  );
};

export default AutoCopies;

// import React, { useState, useEffect } from 'react';
// import { gapi } from 'gapi-script';

// const CLIENT_ID = '1042942150757-2q0dlbnb2ti5dhu68nf8bia7eusuj795.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const API_KEY = 'AIzaSyA4yHLGzLszaPKPS9upLyRrPtqBPvWVnwQ';
// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
// const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

// const AutoCopies = () => {
//   const [productName, setProductName] = useState('');
//   const [productNumber, setProductNumber] = useState('');
//   const [fileContent, setFileContent] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES,
//         ux_mode: 'popup',
//         redirect_uri: 'https://copy-maker.vercel.app',
//       }).then(() => {
//         gapi.auth2.getAuthInstance().signIn();
//       }).catch(err => {
//         setError('Failed to initialize Google API client: ' + err.message);
//       });
//     };
//     gapi.load('client:auth2', initClient);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {

//       const productQuery = `name contains '${productName}' and mimeType = 'application/vnd.google-apps.folder'`;
//       let res = await gapi.client.drive.files.list({ q: productQuery, includeItemsFromAllDrives: true, supportsAllDrives: true });

//       if (res.result.files.length === 0) {
//         throw new Error('No product folder found with the specified name.');
//       }
//       const productFolderId = res.result.files[0].id;

//       const subFolderQuery = `'${productFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'HTML+SL'`;

//       const subFolderRes = await gapi.client.drive.files.list({ q: subFolderQuery, includeItemsFromAllDrives: true, supportsAllDrives: true });

//       if (subFolderRes.result.files.length === 0) {
//         throw new Error('No "HTML+SL" subfolder found.');
//       }
//       const subFolderId = subFolderRes.result.files[0].id;

//       const liftFolderQuery = `'${subFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'Lift ${productNumber}'`;
//       const liftFolderRes = await gapi.client.drive.files.list({ q: liftFolderQuery, includeItemsFromAllDrives: true, supportsAllDrives: true });

//       if (liftFolderRes.result.files.length === 0) {
//         throw new Error(`No "Lift ${productNumber}" subfolder found.`);
//       }
//       const liftFolderId = liftFolderRes.result.files[0].id;

//       const htmlFileQuery = `'${liftFolderId}' in parents and mimeType = 'text/html'`;
//       const fileRes = await gapi.client.drive.files.list({ q: htmlFileQuery, includeItemsFromAllDrives: true, supportsAllDrives: true });

//       if (fileRes.result.files.length === 0) {
//         throw new Error('No HTML file found in the specified subfolder.');
//       }
//       const fileId = fileRes.result.files[0].id;

//       const fileContentRes = await gapi.client.drive.files.get({
//         fileId,
//         alt: 'media'
//       });

//       setFileContent(fileContentRes.body);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           placeholder="Product Name"
//         />
//         <input
//           type="text"
//           value={productNumber}
//           onChange={(e) => setProductNumber(e.target.value)}
//           placeholder="Product Number"
//         />
//         <button type="submit">Fetch File</button>
//       </form>
//       {error && <div style={{color: 'red'}}>{error}</div>}
//       <div>
//         <h2>File Content:</h2>
//         <div dangerouslySetInnerHTML={{ __html: fileContent }} />
//       </div>
//     </div>
//   );
// };

// export default AutoCopies;
