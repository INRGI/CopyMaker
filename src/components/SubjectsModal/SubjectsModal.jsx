import { Container } from './SubjectsModal.styled';

const SubjectsModal = ({ isOpen, onClose }) => {
    return (
        <Container
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Subjects Modal"
            ariaHideApp={false}
        >
            <p>SubjectsModal</p>
        </Container>
    );
};

export default SubjectsModal;
