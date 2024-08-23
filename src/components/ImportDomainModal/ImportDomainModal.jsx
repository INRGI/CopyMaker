import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDomain } from "../../redux/domainSlice";
import { toastError, toastSuccess } from "../../helpers/toastics";
import { Container, FileInputLabel, ImportButton, Title } from "./ImportDomainModal.styled";

const ImportDomainModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const importSingleDomain = () => {
    if (!file) {
      toastError("Please select a file to import!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedDomain = JSON.parse(e.target.result);

        if (importedDomain && importedDomain.name && importedDomain.id) {
          dispatch(addDomain(importedDomain));
          toastSuccess("Domain successfully imported!");
          onClose();
        } else {
          toastError("Invalid file format or missing required data!");
        }
      } catch (error) {
        toastError("Failed to read the file!");
      }
    };

    reader.readAsText(file);
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  return (
    <Container
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Import Domain Modal"
    >
      <Title>Please select domain JSON file</Title>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="import-input"
      />
      <FileInputLabel htmlFor="import-input">Choose file</FileInputLabel>
      
      {file && <ImportButton onClick={importSingleDomain}>Import domain</ImportButton>}
    </Container>
  );
};

export default ImportDomainModal;
