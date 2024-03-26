import { ButtonNo, ButtonYes, ButtonsContainer, Container, Title } from './DeleteConfirmationModal.styled';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Container
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Delete Confirmation Modal"
            ariaHideApp={false}
        >
            <Title>Are you sure you want to delete this domain?</Title>
            <ButtonsContainer>
                <ButtonYes onClick={onConfirm}>Yes</ButtonYes>
                <ButtonNo onClick={onClose}>No</ButtonNo>
            </ButtonsContainer>
        </Container>
    );
};

export default DeleteConfirmationModal;
