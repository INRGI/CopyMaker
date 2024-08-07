import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editDomain } from "../../redux/domainSlice";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  ButtonContainer,
  Container,
  LinkContainer,
  LinkText,
  MuiInput,
  TestButton,
} from "./LInkBuilderModal.styled";
import useExcelData from "../../hooks/useExcelData";
import * as XLSX from "xlsx";

const FeedbackSchema = Yup.object().shape({
  urlStart: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Please enter a url start"),
  urlEnd: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Please enter a url end"),
  copyName: Yup.string()
    .min(3, "Too Short!")
    .max(10, "Too Long!")
    .required("Please enter copy name"),
});

const LinkBuilderModal = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch();
  const { domainId } = useParams();
  let domain = useSelector((state) =>
    state.domains.find((domain) => domain.id === domainId)
  );

  const excelData = useExcelData("/products.xlsx");

  const [linkType, setLinkType] = useState(domain ? domain.linkType : "");
  const [typeRT, setTypeRT] = useState(domain ? domain.typeRT : "");
  const [result, setResult] = useState("");

  useEffect(() => {
    setLinkType(domain ? domain.linkType : "")
    setTypeRT(domain ? domain.typeRT : "")
  }, [domainId, dispatch]);

  const linkStartId = nanoid();
  const linkEndId = nanoid();
  const copyNameId = nanoid();

  const initialValues = {
    urlStart: domain ? domain.urlStart : "",
    urlEnd: domain ? domain.urlEnd : "",
    copyName: "",
  };

  const handleSubmit = (values) => {
    const productName = values.copyName;
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

    if (linkType === "RedTrack") {
      if (typeRT === "RT2 Blue STR") {
        const value = extractValue(excelData, productName, columnName);
        const img = extractValue(excelData, productName, "IMG-IT").match(/[a-zA-Z]+(.+)/)[1];
        const prefix = productName.match(/[a-zA-Z]+(.+)/)[1];
        if (value) {
          const linkUrl = `${values.urlStart}${value}${values.urlEnd}${img}_${prefix}`;
          setResult(linkUrl);
          dispatch(
            editDomain({
              id: domainId,
              values: { ...values, linkType, typeRT, linkUrl },
            })
          );
          toast.success("Your link created", {
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
        } else {
          toast.error("Product not found", {
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
        }
      } 
      else if (typeRT === "RT TM(IT3)") {
        const value = extractValue(excelData, productName, "RT TM");
        const img = extractValue(excelData, productName, "IMG-IT").match(/[a-zA-Z]+(.+)/)[1];
        const prefix = productName.match(/[a-zA-Z]+(.+)/)[1];
        if (value) {
          const linkUrl = `${values.urlStart}${value}${values.urlEnd}${img}_${prefix}`;
          setResult(linkUrl);
          dispatch(
            editDomain({
              id: domainId,
              values: { ...values, linkType, typeRT, linkUrl },
            })
          );
          toast.success("Your link created", {
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
        } else {
          toast.error("Product not found", {
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
        }
      } 
      else {
        const value = extractValue(excelData, productName, columnName);
        if (value) {
          const linkUrl = `${values.urlStart}${value}${values.urlEnd}${productName}`;
          setResult(linkUrl);
          dispatch(
            editDomain({
              id: domainId,
              values: { ...values, linkType, typeRT, linkUrl },
            })
          );
          toast.success("Your link created", {
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
        } else {
          toast.error("Product not found", {
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
        }
      }
    }

    if (linkType === "Volume") {
      if (typeRT === "Vol Blue") {
        const value = extractValue(excelData, productName, columnName);
        const img = extractValue(excelData, productName, "IMG-IT").match(/[a-zA-Z]+(.+)/)[1];
        const prefix = productName.match(/[a-zA-Z]+(.+)/)[1];
        if (value) {
          const linkUrl = `${values.urlStart}${value}${values.urlEnd}${img}_${prefix}`;
          setResult(linkUrl);
          dispatch(
            editDomain({
              id: domainId,
              values: { ...values, linkType, typeRT, linkUrl },
            })
          );
          toast.success("Your link created", {
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
          return;
        } else {
          toast.error("Product not found", {
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
        }
      } 
      const value = extractValue(excelData, productName, columnName);
      const img = extractValue(excelData, productName, "IMG-IT");
      const prefix = productName.match(/[a-zA-Z]+(.+)/)[1];
      if (value) {
        const linkUrl = `${values.urlStart}${value}${values.urlEnd}${img}_${prefix}`;
        setResult(linkUrl);
        dispatch(
          editDomain({
            id: domainId,
            values: { ...values, linkType, typeRT, linkUrl },
          })
        );
        toast.success("Your link created", {
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
      } else {
        toast.error("Product not found", {
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
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Link copied", {
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

  const handleOpenLink = () => {
    window.open(result, "_blank");
  };

  const handleChange = (event) => {
    setLinkType(event.target.value);
  };

  const handleRTChange = (event) => {
    setTypeRT(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Container
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Link Builder Modal"
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Choose type of links
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={linkType}
          label="Choose type of links"
          onChange={handleChange}
        >
          <MenuItem value={"Volume"}>Volume</MenuItem>
          <MenuItem value={"RedTrack"}>RedTrack</MenuItem>
        </Select>
      </FormControl>
      {linkType === "RedTrack" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose type of RT
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeRT}
            label="Choose type of RT"
            onChange={handleRTChange}
          >
            <MenuItem value={"RT TM"}>RT TM</MenuItem>
            <MenuItem value={"RT TM(IT3)"}>RT TM(IT3)</MenuItem>
            <MenuItem value={"RT GNF"}>RT GNF</MenuItem>
            <MenuItem value={"RT GF"}>RT GF</MenuItem>
            <MenuItem value={"RT GK"}>RT GK</MenuItem>
            <MenuItem value={"RT Blue"}>RT Blue</MenuItem>
            <MenuItem value={"RT2 Blue STR"}>RT2 Blue STR</MenuItem>
            <MenuItem value={"RT3 Blue (Killing)"}>RT3 Blue (Killing)</MenuItem>
            <MenuItem value={"RT R"}>RT R</MenuItem>
            <MenuItem value={"RT FR"}>RT FR</MenuItem>
            <MenuItem value={"RT D"}>RT D</MenuItem>
            <MenuItem value={"RT O"}>RT O</MenuItem>
            <MenuItem value={"RT Purple Kill (ETP6)"}>
              RT Purple Kill (ETP6)
            </MenuItem>
          </Select>
        </FormControl>
      )}
      {typeRT !== "" && linkType === "RedTrack" && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          <Form>
            <LinkContainer>
              <Field
                fullWidth
                as={MuiInput}
                label="Link Start"
                size="small"
                variant="outlined"
                type="text"
                name="urlStart"
                id={linkStartId}
                placeholder="Link Start"
                autoComplete="off"
                required
              />
              <LinkText>RT</LinkText>
              <Field
                fullWidth
                as={MuiInput}
                label="Link End"
                size="small"
                variant="outlined"
                type="text"
                name="urlEnd"
                id={linkEndId}
                placeholder="Link End"
                autoComplete="off"
                required
              />
              <LinkText>COPY</LinkText>
            </LinkContainer>

            <LinkContainer>
              <Field
                fullWidth
                as={MuiInput}
                label="Copy Name"
                size="small"
                variant="outlined"
                type="text"
                name="copyName"
                id={copyNameId}
                placeholder="Copy Name"
                autoComplete="off"
                required
              />

              <Button type="submit" onClick={() => handleSubmit()}>
                Make a link
              </Button>
            </LinkContainer>
            {result !== "" && (
              <ButtonContainer>
                <TestButton type="button" onClick={handleOpenLink}>
                  Try Link
                </TestButton>
                <TestButton
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    handleCopy();
                  }}
                >
                  Copy Link
                </TestButton>
              </ButtonContainer>
            )}
          </Form>
        </Formik>
      )}

      {linkType === "Volume" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose type of Volume
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeRT}
            label="Choose type of Volume"
            onChange={handleRTChange}
          >
            <MenuItem value={"Vol Green"}>Vol Green</MenuItem>
            <MenuItem value={"Vol Blue"}>Vol Blue</MenuItem>
          </Select>
        </FormControl>
      )}
      {typeRT !== "" && linkType === "Volume" && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          <Form>
            <LinkContainer>
              <Field
                fullWidth
                as={MuiInput}
                label="Link Start"
                size="small"
                variant="outlined"
                type="text"
                name="urlStart"
                id={linkStartId}
                placeholder="Link Start"
                autoComplete="off"
                required
              />
              <LinkText>Volume</LinkText>
              <Field
                fullWidth
                as={MuiInput}
                label="Link End"
                size="small"
                variant="outlined"
                type="text"
                name="urlEnd"
                id={linkEndId}
                placeholder="Link End"
                autoComplete="off"
                required
              />
              <LinkText>IMG</LinkText>
            </LinkContainer>

            <LinkContainer>
              <Field
                fullWidth
                as={MuiInput}
                label="Copy Name"
                size="small"
                variant="outlined"
                type="text"
                name="copyName"
                id={copyNameId}
                placeholder="Copy Name"
                autoComplete="off"
                required
              />

              <Button type="submit" onClick={() => handleSubmit()}>
                Make a link
              </Button>
            </LinkContainer>
            {result !== "" && (
              <ButtonContainer>
                <TestButton type="button" onClick={handleOpenLink}>
                  Try Link
                </TestButton>
                <TestButton
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    handleCopy();
                  }}
                >
                  Copy Link
                </TestButton>
              </ButtonContainer>
            )}
          </Form>
        </Formik>
      )}
    </Container>
  );
};

export default LinkBuilderModal;
