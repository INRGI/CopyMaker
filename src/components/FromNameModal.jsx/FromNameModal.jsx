
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, TitleContainer } from './FromNameModal.styled';

const FromNameModal = ({ isOpen, onClose }) =>{


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
                <Title>FromNameModal</Title>
                
                
            </TitleContainer> 
            
        </Container>
    )
};

export default FromNameModal;