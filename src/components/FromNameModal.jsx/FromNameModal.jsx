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
} from "./FromNameModal.styled";

const FromNameModal = ({ isOpen, onClose, activeItem }) => {
  const handleClose = () => {
    onClose();
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
          <Text><strong>FN:</strong> {activeItem.from}</Text>

          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(activeItem.from);
            }}
            type="button"
          >
            Copy
          </CopyButton>
        </TextContainer>
        <TextContainer>
          <Text><strong>SL:</strong> {activeItem.sl}</Text>

          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(activeItem.sl);
            }}
            type="button"
          >
            Copy
          </CopyButton>
        </TextContainer>
        <TextContainer>
          <Text><strong>PH:</strong> {activeItem.ph}</Text>

          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(activeItem.ph);
            }}
            type="button"
          >
            Copy
          </CopyButton>
        </TextContainer>
      </div>
    </Container>
  );
};

export default FromNameModal;
