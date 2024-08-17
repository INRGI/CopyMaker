import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editDomain } from "../../redux/domainSlice";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Container,
  FormContainer,
  LinkContainer,
  LinkText,
  MuiInput,
} from "./UnsubBuilderModal.styled";

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

  const initialValues = {
    unsubStart: domain ? domain.unsubStart : "",
    unsubEnd: domain ? domain.unsubEnd : "",
    typeOfUnsub: domain ? domain.typeOfUnsub : "",
  };

  const handleSubmit = (values) => {
    dispatch(editDomain({
      id: domainId,
      values: { ...values, typeOfUnsub },
    }));
    toast.success("Saved", {
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

  const handleTypeChange = (event) => {
    setTypeOfUnsub(event.target.value);
  };

  return (
    <Container
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Unsub Builder Modal"
    >
      

      {initialValues.typeOfUnsub !== "" && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          <FormContainer>
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
          <MenuItem value={"Voluum unsub ID "}>Voluum unsub ID</MenuItem>
        </Select>
      </FormControl>

            <LinkContainer>
              <Field
                fullWidth
                as={MuiInput}
                label="Unsub Start"
                size="small"
                variant="outlined"
                type="text"
                name="unsubStart"
                placeholder="Unsub Start"
                autoComplete="off"
                required
              />
              <LinkText>ID</LinkText>
              <Field
                fullWidth
                as={MuiInput}
                label="Unsub End"
                size="small"
                variant="outlined"
                type="text"
                name="unsubEnd"
                placeholder="Unsub End"
                autoComplete="off"
                required
              />
            </LinkContainer>

            <LinkContainer>
              <Button type="submit">
                Save
              </Button>
            </LinkContainer>
          </FormContainer>
        </Formik>
      )}
    </Container>
  );
};


export default UnsubBuilderModal;
