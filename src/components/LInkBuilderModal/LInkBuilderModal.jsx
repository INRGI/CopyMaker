import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, ButtonContainer, Container, LinkContainer, LinkText, MuiInput, TestButton } from "./LInkBuilderModal.styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { editDomain } from "../../redux/domainSlice";
import { useParams } from "react-router-dom";

const FeedbackSchema = Yup.object().shape({
  urlStart: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a url start"),
    urlEnd: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a url end"),
    copyName: Yup.string()
    .min(3, "Too Short!")
    .max(10, "Too Long!")
    .required("Please enter copy name"),
});

const LinkBuilderModal = ({ isOpen, onClose, onConfirm }) => {
  const [linkType, setLinkType] = useState("");
  const [typeRT, setTypeRT] = useState("");
  const [result, setResult] = useState("https://google.com"); 

  const linkStartId = nanoid();
  const linkEndId = nanoid();
  const copyNameId = nanoid();

  const dispatch = useDispatch();
  const { domainId } = useParams();
  const domain = useSelector(state => state.domains.find(domain => domain.id === domainId));

  const initialValues = {
    urlStart: domain ? domain.urlStart : "",
    urlEnd: domain ? domain.urlEnd : "",
    copyName: "",
  };

  const handleSubmit = (values) => {
    console.log(domain)
    dispatch(editDomain({ id: domainId, values: {...values}}));
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
  };

  const handleCopy = () => {
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
    window.open(result, '_blank');
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
            <MenuItem value={"RT GNF"}>RT GNF</MenuItem>
            <MenuItem value={"RT GF"}>RT GF</MenuItem>
            {/* <MenuItem value={"RT R"}>RT R</MenuItem>
            <MenuItem value={"RT FR"}>RT FR</MenuItem>
            <MenuItem value={"RT Blue"}>RT Blue</MenuItem>
            <MenuItem value={"RT2 Blue STR"}>RT2 Blue STR</MenuItem>
            <MenuItem value={"RT Purple Kill (ETP6)"}>
              RT Purple Kill (ETP6)
            </MenuItem>
            <MenuItem value={"RT Purple (IT3+other)"}>
              RT Purple (IT3+other)
            </MenuItem>
            <MenuItem value={"RT3 Blue (Killing)"}>RT3 Blue (Killing)</MenuItem> */}
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
                required
              />

              <Button type="submit" onClick={()=> handleSubmit()}>Make a link</Button>
              </LinkContainer>
              {result !== '' && (
                <ButtonContainer>
                  <TestButton type="button" onClick={handleOpenLink}>Try Link</TestButton>
                  <TestButton type="button" onClick={() => {navigator.clipboard.writeText(result) ; handleCopy();}}>Copy Link</TestButton>
                </ButtonContainer>
              )}
          </Form>
        </Formik>
      )}
    </Container>
  );
};

export default LinkBuilderModal;

// CHOOSE TYPE OF LINKS (REDTRACK, VOLUME) / CHECKBOXES OR I SELECT
// LINK BASEMENT TO REDUX (IN MODAL JUST OR WHEN YOU EDIT NAME OF DOMAINS MODAL)
// INPUT COPY / get only name /search in csv and paste to places where it needed
// NOTLIFY - RETURN TO PROMOCOPY AND REPLACE THERE
// POSSIBILITY TO CHECK LINK(BTN)

// IF NOT FOUND POPUP
