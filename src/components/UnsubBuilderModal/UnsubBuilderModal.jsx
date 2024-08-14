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
  Container,
  LinkContainer,
  LinkText,
  MuiInput,
} from "./LInkBuilderModal.styled";

const FeedbackSchema = Yup.object().shape({
  unsubStart: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Please enter a url start"),
  unsubEnd: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Please enter a url end"),
});

const UnsubBuilderModal = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch();
  const { domainId } = useParams();
  let domain = useSelector((state) =>
    state.domains.find((domain) => domain.id === domainId)
  );

  const [unsubStart, setUnsubStart] = useState(domain ? domain.unsubStart : "");
  const [unsubEnd, setUnsubEnd] = useState(domain ? domain.unsubEnd : "");
  const [typeOfUnsub, setTypeOfUnsub] = useState(
    domain ? domain.typeOfUnsub : ""
  );

  useEffect(() => {
    setUnsubStart(domain ? domain.unsubStart : "");
    setUnsubEnd(domain ? domain.unsubEnd : "");
    setTypeOfUnsub(domain ? domain.typeOfUnsub : "");
  }, [domainId, dispatch]);

  const unsubStartId = nanoid();
  const unsubEndId = nanoid();

  const initialValues = {
    unsubStart: domain ? domain.unsubStart : "",
    unsubEnd: domain ? domain.unsubEnd : "",
    typeOfUnsub: domain ? domain.typeOfUnsub : "",
  };

  const handleSubmit = () => {};

  const handleClose = () => {
    onClose();
  };

  const handleTypeChange = (event) => {
    setTypeOfUnsub(event.target.value);
  };

  return (
    <Container
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Unsub Builder Modal"
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Choose type of unsub
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeOfUnsub}
          label="Choose type of links"
          onChange={handleTypeChange}
        >
          <MenuItem value={"UNSUB ID"}>UNSUB ID</MenuItem>
          <MenuItem value={"Voluum unsub ID"}>Voluum unsub ID</MenuItem>
        </Select>
      </FormControl>

      {typeOfUnsub !== "" && (
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
                label="Unsub Start"
                size="small"
                variant="outlined"
                type="text"
                name="unsubStart"
                id={unsubStartId}
                placeholder="Unsub Start"
                autoComplete="off"
                required
              />
              <LinkText>Unsub ID</LinkText>
              <Field
                fullWidth
                as={MuiInput}
                label="Unsub End"
                size="small"
                variant="outlined"
                type="text"
                name="unsubEnd"
                id={unsubEndId}
                placeholder="Unsub End"
                autoComplete="off"
                required
              />
            </LinkContainer>

            <LinkContainer>

              <Button type="submit" onClick={() => handleSubmit()}>
              Save
              </Button>
            </LinkContainer>
          </Form>
        </Formik>
      )}
    </Container>
  );
};

export default UnsubBuilderModal;
