import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BtnBack,
  Container,
  CopyButton,
  Text,
  TextContainer,
  Title,
  TitleContainer,
  ButtonDownload,
} from "./FromNameModal.styled";

const FromNameModal = ({ isOpen, onClose, activeItem }) => {
  const handleClose = () => {
    onClose();
  };

  const handleCopy = () => {
    toast.success("Text copied", {
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

  const handleDownload = async () => {
    try {
      const url = `/api/download?url=${encodeURIComponent(activeItem.imageUrl[0])}`;
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = activeItem.imageUrl[0].split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('There was an error downloading the image:', error);
    }
  };

  return (
    <Container
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Edit Confirmation Modal"
    >
      <TitleContainer>
        <Title>{activeItem.name}</Title>

        <BtnBack type="button" onClick={onClose}>
          Back
        </BtnBack>
      </TitleContainer>

      <div>
        <TextContainer>
          <Text>
            <strong>FN:</strong> {activeItem.from}
          </Text>

          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(activeItem.from);
              handleCopy();
            }}
            type="button"
          >
            Copy
          </CopyButton>
        </TextContainer>
        <TextContainer>
          <Text>
            <strong>SL:</strong> {activeItem.sl}
          </Text>

          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(activeItem.sl);
              handleCopy();
            }}
            type="button"
          >
            Copy
          </CopyButton>
        </TextContainer>
        <TextContainer>
          <Text>
            <strong>PH:</strong> {activeItem.ph}
          </Text>

          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(activeItem.ph);
              handleCopy();
            }}
            type="button"
          >
            Copy
          </CopyButton>
        </TextContainer>
        {activeItem.imageUrl && activeItem.imageUrl.length > 0 && (
          <TextContainer>
            <Text>
              <strong>Image:</strong>
            </Text>
            <ButtonDownload onClick={handleDownload} type="button">
              Download Image
            </ButtonDownload>
          </TextContainer>
        )}
      </div>
    </Container>
  );
};

export default FromNameModal;
