import { Container } from "./LinkBuilder.styled";

const LinkBuilder = ({isOpen, onClose, onConfirm, builder}) => {

    const handleSubmit = () => {
        onConfirm()
    }

    return (
        <Container
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Confirmation Modal"
        >   
            <button type="button" onClick={onClose}>Close</button>
            <h1>LinkBuilder</h1>
            <p>{builder}</p>
        </Container>
    )
};

export default LinkBuilder;