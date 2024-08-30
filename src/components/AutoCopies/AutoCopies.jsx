import { gapi } from "gapi-script";

import useExcelData from "../../hooks/useExcelData";
import * as XLSX from "xlsx";

import { useCallback, useEffect, useState } from "react";
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
  LoadingContainer,
  MuiInput,
  PageContainer,
  ResultContainer,
  ResultText,
  ResultTitle,
  SubmitButtonDownload,
  SubmitContainer,
  TitleImages,
  UnsubBuilderButton,
} from "./AutoCopies.styled";
import { GrDownload } from "react-icons/gr";
import { BsCopy } from "react-icons/bs";

import Loader from "../Loader";
import AddImageModal from "../AddImageModal";
import Checkbox from "@mui/material/Checkbox";
import makeCopy from "../../helpers/makeCopy";
import InfoButton from "../InfoButton/InfoButton";
import Preview from "../Preview/Preview";
import AddHiddenModal from "../AddHiddenModal/AddHiddenModal";
import LinkBuilderModal from "../LInkBuilderModal/LInkBuilderModal";
import SubjectsModal from "../SubjectsModal/SubjectsModal";
import makeUnique from "../../helpers/makeUnique";
import { toastError, toastSuccess } from "../../helpers/toastics";
import PriorityDetails from "../PriorityDetails/PriorityDetails";
import UnsubBuilderModal from "../UnsubBuilderModal/UnsubBuilderModal";
import { exportSingleDomain } from "../../helpers/exportSingleDomain";
import MakeUniqueModal from "../MakeUniqueModa/MakeUniqueModal";

const CLIENT_ID =
  "1042942150757-2q0dlbnb2ti5dhu68nf8bia7eusuj795.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const API_KEY = "AIzaSyA4yHLGzLszaPKPS9upLyRrPtqBPvWVnwQ";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

const AutoCopies = () => {
  const [textArray, setTextArray] = useState([]);
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
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
  const [isBotLink, setBotLink] = useState(domain?.isLineHeight || false);

  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitedResult, setSubmitedResult] = useState("");

  const [newLinks, setNewLinks] = useState(
    domain.images ? Array.from({ length: domain.images.length }, () => "") : []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHiddenModalOpen, setHiddenModalOpen] = useState(false);
  const [isLinkBuilderOpen, setLinkBuilderOpen] = useState(false);
  const [isUnsubBuilderModal, setUnsubBuilderModal] = useState(false);
  const [isSubjectsModal, setSubjectsModal] = useState(false);
  const [isUniqueModal, setUniqueModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const excelData = useExcelData("/products.xlsx");
  const [linkType, setLinkType] = useState(domain ? domain.linkType : "");
  const [typeRT, setTypeRT] = useState(domain ? domain.typeRT : "");
  const [result, setResult] = useState("");
  
  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client
  //       .init({
  //         apiKey: API_KEY,
  //         clientId: CLIENT_ID,
  //         discoveryDocs: DISCOVERY_DOCS,
  //         scope: SCOPES,
  //         ux_mode: "popup",
  //         redirect_uri: "https://copy-maker.vercel.app",
  //       })
  //       .then(() => {
  //         gapi.auth2.getAuthInstance().signIn();
  //       })
  //       .catch((err) => {
  //         setError("Failed to initialize Google API client: " + err.message);
  //       });
  //   };
  //   gapi.load("client:auth2", initClient);
  // }, []);


  const [isSignedIn, setIsSignedIn] = useState(false);

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
          const authInstance = gapi.auth2.getAuthInstance();

          const isSignedIn = authInstance.isSignedIn.get();
          setIsSignedIn(isSignedIn);

          if (!isSignedIn) {
            authInstance.signIn();
          }

          localStorage.setItem('isSignedIn', isSignedIn);
        })
        .catch((err) => {
          setError("Failed to initialize Google API client: " + err.message);
        });
    };

    gapi.load("client:auth2", initClient);

    const storedIsSignedIn = localStorage.getItem('isSignedIn');
    if (storedIsSignedIn) {
      setIsSignedIn(storedIsSignedIn === 'true');
    }
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
    botUrl: domain?.botUrl || "",
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
      setBotLink(domain.isBotLink);
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
    const images = submitedResult.match(/<img\s+[^>]*src=["'](.*?)["'][^>]*>/g);

    if (index >= 0 && index < images.length) {
      const oldSrc = images[index].match(/src=["'](.*?)["']/)[1];
      const updatedResult = submitedResult.replace(oldSrc, newSrc);
      setSubmitedResult(updatedResult);
    }
  };

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
  const BotLinkId = nanoid();

  const hasImages = /<img\s+[^>]*src=["'](.*?)["'][^>]*>/g.test(submitedResult);

  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    if (values.submit === productName) {
      dispatch(
        editDomain({
          id: domainId,
          values: {
            ...values,
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
            isBotLink,
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
          isBotLink,
        })
      );
      return;
    }
    setError("");

    if (linkType && typeRT && excelData && values.submit) {
      const columnName = typeRT;

      const extractValue = (data, productName, columnName) => {
        const sheet = data.Sheets[data.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const header = json[0];
        const columnIndex = header.indexOf(columnName);

        if (columnIndex === -1) return null;

        const row = json.find((row) => {
          const cellValue = row[0];
          if (!cellValue) return false;
          const prefix = productName.match(/[a-zA-Z]+/)[0];
          const cleanedCellValue = cellValue
            .toString()
            .replace(/[^a-zA-Z0-9]/g, "");
          return cellValue && cleanedCellValue.toString().startsWith(prefix);
        });

        return row ? row[columnIndex] : null;
      };

      const generateLink = () => {
        if (linkType === "RedTrack") {
          if (typeRT === "RT2 Blue STR"){
            const value = extractValue(excelData, values.submit, columnName);
            const img = extractValue(excelData, values.submit, "IMG-IT").match(/[a-zA-Z]+(.+)/)[1];
            const prefix = values.submit.match(/[a-zA-Z]+(.+)/)[1];
          if (value) {
            const linkUrl = `${domain.urlStart}${value}${domain.urlEnd}${img}_${prefix}`;
            setResult(linkUrl);
            dispatch(editDomain({ id: domainId, values: { linkUrl } }));
            toastSuccess("Your link created");
            return linkUrl;
          } else {
            toastError("Product not found");
          }
          }
          else if (typeRT === "RT TM(IT3)"){
            const value = extractValue(excelData, values.submit, "RT TM");
            const img = extractValue(excelData, values.submit, "IMG-IT").match(/[a-zA-Z]+(.+)/)[1];
            const prefix = values.submit.match(/[a-zA-Z]+(.+)/)[1];
          if (value) {
            const linkUrl = `${domain.urlStart}${value}${domain.urlEnd}${img}_${prefix}`;
            setResult(linkUrl);
            dispatch(editDomain({ id: domainId, values: { linkUrl } }));
            toastSuccess("Your link created");
            return linkUrl;
          } else {
            toastError("Product not found");
          }
          }else{
            const value = extractValue(excelData, values.submit, columnName);
          if (value) {
            const linkUrl = `${domain.urlStart}${value}${domain.urlEnd}${values.submit}`;
            setResult(linkUrl);
            dispatch(editDomain({ id: domainId, values: { linkUrl } }));
            toastSuccess("Your link created");
            return linkUrl;
          } else {
            toastError("Product not found");
          }
          }
        }

        if (linkType === "Volume") {
          if (typeRT === "Vol Blue"){
            const value = extractValue(excelData, values.submit, columnName);
            const img = extractValue(excelData, values.submit, "IMG-IT").match(/[a-zA-Z]+(.+)/)[1];
            const prefix = values.submit.match(/[a-zA-Z]+(.+)/)[1];
          if (value) {
            const linkUrl = `${domain.urlStart}${value}${domain.urlEnd}${img}_${prefix}`;
            setResult(linkUrl);
            dispatch(editDomain({ id: domainId, values: { linkUrl } }));
            toastSuccess("Your link created");
            return linkUrl;
          } else {
            toastError("Product not found");
          }
          }
          const value = extractValue(excelData, values.submit, columnName);
          const img = extractValue(excelData, values.submit, "IMG-IT");
          const prefix = values.submit.match(/[a-zA-Z]+(.+)/)[1];
          if (value) {
            const linkUrl = `${domain.urlStart}${value}${domain.urlEnd}${img}_${prefix}`;
            setResult(linkUrl);
            dispatch(editDomain({ id: domainId, values: { linkUrl } }));
            toastSuccess("Your link created");
            return linkUrl;
          } else {
            toastError("Product not found");
          }
        }
      };
      const linka = generateLink();

      try {
        setIsLoading(true);
        setTextArray([]);
        setProductName(values.submit);

        const copyName = values.submit.match(/[a-zA-Z]+/)[0];
        const liftName = values.submit.match(/[a-zA-Z]+(\d+)/)[1];

        const productQuery = `name contains '${copyName}' and mimeType = 'application/vnd.google-apps.folder'`;
        let res = await gapi.client.drive.files.list({
          q: productQuery,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
        });

        if (res.result.files.length === 0) {
          throw new Error("No product folder found with the specified name.");
        }

        const cleanFolderName = (name) =>
          name
            .replace(/[^\w\s]/g, "")
            .split(" ")[0]
            .trim();
        let productFolder = res.result.files.find(
          (file) => cleanFolderName(file.name) === copyName
        );

        if (!productFolder) {
          throw new Error(
            "No exact product folder found with the specified name."
          );
        }

        const productFolderId = productFolder.id;

        const subFolderQuery = `'${productFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'HTML+SL'`;
        const subFolderRes = await gapi.client.drive.files.list({
          q: subFolderQuery,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
        });

        if (subFolderRes.result.files.length === 0) {
          toastError("No 'HTML+SL' subfolder found.");
          throw new Error('No "HTML+SL" subfolder found.');
        }
        const subFolderId = subFolderRes.result.files[0].id;

        const liftFolderQuery = `'${subFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'Lift '`;
        const liftFolderRes = await gapi.client.drive.files.list({
          q: liftFolderQuery,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
        });

        if (liftFolderRes.result.files.length === 0) {
          toastError("Copy not found(Lift)")
          throw new Error(`No "Lift ${liftName}" subfolder found.`);
        }

        const liftNumber = liftName.match(/\d+/)[0];
        liftFolderRes.result.files = liftFolderRes.result.files.filter(
          (file) => {
            const match = file.name.match(/Lift (\d+)/);
            return match && match[1] === liftNumber;
          }
        );

        if (liftFolderRes.result.files.length === 0) {
          toastError("Copy not found(Lift)");
          throw new Error(`No exact "Lift ${liftName}" subfolder found.`);
        }

        const liftFolderId = liftFolderRes.result.files[0].id;

        const htmlFileQuery = `'${liftFolderId}' in parents and mimeType = 'text/html'`;
        const fileRes = await gapi.client.drive.files.list({
          q: htmlFileQuery,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
        });

        if (fileRes.result.files.length === 0) {
          toastError("Copy not found(HTML File)");
          throw new Error("No HTML file found in the specified subfolder.");
        }
        const fileId = fileRes.result.files.filter(file => !file.name.toLowerCase().includes('mjml'))[0].id;

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
              submit: values.submit,
              linkUrl: linka,
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
              isBotLink,
            },
          })
        );
        setSubmitedResult(
          makeCopy({
            ...values,
            submit: fileContentRes.body,
            linkUrl: linka,
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
            isBotLink,
          })
        );
        setIsSubmitted(true);
        toastSuccess("Copy done");

        const docFileQuery = `'${liftFolderId}' in parents and mimeType = 'application/vnd.google-apps.document'`;
        const fileResDock = await gapi.client.drive.files.list({
          q: docFileQuery,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
        });

        const filteredFilesDock = fileResDock.result.files.filter(file => !file.name.toLowerCase().includes('html'));

        if (filteredFilesDock.length === 0) {
          toastError("SL not found");
          throw new Error("No Word document found that doesn't contain 'html' in the name.");
        }

        const fileIdDock = filteredFilesDock[0].id;

        const fileContentResDock = await gapi.client.drive.files.export({
          fileId: fileIdDock,
          mimeType: "text/plain",
        });

        const subjbody = fileContentResDock.body;
        const sentences = subjbody
          .split("\n")
          .map((sentence) => makeUnique(sentence.trim()))
          .filter((sentence) => sentence.length > 0);
        setTextArray(sentences);
        toastSuccess("SL done");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        setSubmitting(false);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
  });

  const matchResult = productName.match(/[a-zA-Z]+/);
  const productNamePart = matchResult ? matchResult[0] : '';

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

  const handleUnsubBuilderConfirm = (response) => {
    setUnsubBuilderModal(false);
  };

  const handleCopy = () => {
    toastSuccess("Copy copied");
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
        <UnsubBuilderButton type="button" onClick={() => setUnsubBuilderModal(true)}>Unsub Builder</UnsubBuilderButton>
        <AddImageButton type="button" onClick={() => setSubjectsModal(true)}>
          Subjects
        </AddImageButton>
        <HiddenImageButton onClick={() => setUniqueModal(true)}>Anti Spam</HiddenImageButton>
        <HiddenImageButton
          type="button"
          onClick={() => exportSingleDomain(domain)}
        >
          Export Domain
        </HiddenImageButton>
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
                botUrl: domain.botUrl || "",
                submit: domain.submit || "",
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
                <InputContainer>
                  <Checkbox
                    checked={isBotLink}
                    onChange={() => setBotLink((prev) => !prev)}
                    color="success"
                  />
                  <Field
                    fullWidth
                    as={MuiInput}
                    label="botTrap"
                    size="small"
                    variant="outlined"
                    type="text"
                    name="botUrl"
                    id={BotLinkId}
                    placeholder="Paste your bot link here"
                    disabled={!isBotLink}
                    required
                  ></Field>

                  <InfoButton text="Please paste your bot link here" />
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
                      .match(/<img\s+[^>]*src=["'](.*?)["'][^>]*>/g)
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

              {isSubmitted && submitedResult !== "" && (
                <div>
                  <ResultTitle>Your Copy below</ResultTitle>
                  <ResultContainer>
                    <ResultText>{submitedResult}</ResultText>
                    <CopyButton
                      onClick={() => {
                        navigator.clipboard.writeText(submitedResult);
                        handleCopy();
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
      {isLoading ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : (
        <>
        <Preview result={submitedResult} >
        <PriorityDetails productName={productNamePart}/>
        </Preview>
        </>
      )}

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
      <UnsubBuilderModal
        isOpen={isUnsubBuilderModal}
        onClose={() => setUnsubBuilderModal(false)}
        onConfirm={handleUnsubBuilderConfirm}
      />
      <SubjectsModal
        isOpen={isSubjectsModal}
        onClose={() => setSubjectsModal(false)}
        subjects={textArray}
      />
      <MakeUniqueModal
                isOpen={isUniqueModal}
                onClose={() => setUniqueModal(false)}
            /> 
    </PageContainer>
  );
};

export default AutoCopies;
