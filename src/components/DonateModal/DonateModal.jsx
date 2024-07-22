import { Container, Title } from './DonateModal.styled';

const DonateModal = ({ isOpen, onClose }) => {
    return (
        <Container
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Donate Modal"
            ariaHideApp={false}
        >
            <Title>You can support us using Monobank</Title>

        </Container>
    );
};

export default DonateModal;
