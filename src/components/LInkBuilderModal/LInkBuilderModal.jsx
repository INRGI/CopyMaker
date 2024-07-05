import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, LinkContainer, LinkText, MuiInput } from "./LInkBuilderModal.styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";

const FeedbackSchema = Yup.object().shape({
  ulrStart: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter a url start"),
});

const LinkBuilderModal = ({ isOpen, onClose, onConfirm }) => {
  const [linkType, setLinkType] = useState("");
  const [typeRT, setTypeRT] = useState("");

  const linkStartId = nanoid();

  const initialValues = {
    ulrStart: "",
  };

  const handleSubmit = () => {
    toast.success("Your text changed", {
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
            <MenuItem value={"RT R"}>RT R</MenuItem>
            <MenuItem value={"RT FR"}>RT FR</MenuItem>
            <MenuItem value={"RT Blue"}>RT Blue</MenuItem>
            <MenuItem value={"RT2 Blue STR"}>RT2 Blue STR</MenuItem>
            <MenuItem value={"RT Purple Kill (ETP6)"}>
              RT Purple Kill (ETP6)
            </MenuItem>
            <MenuItem value={"RT Purple (IT3+other)"}>
              RT Purple (IT3+other)
            </MenuItem>
            <MenuItem value={"RT3 Blue (Killing)"}>RT3 Blue (Killing)</MenuItem>
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
                name="ulrStart"
                id={linkStartId}
                placeholder="Link Start"
                required
              />
              <LinkText>Your RT</LinkText>
            </LinkContainer>
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
