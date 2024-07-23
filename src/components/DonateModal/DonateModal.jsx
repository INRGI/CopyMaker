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
            <img width={300} src='../../../public/mono.jpg'></img>
        </Container>
    );
};

export default DonateModal;
