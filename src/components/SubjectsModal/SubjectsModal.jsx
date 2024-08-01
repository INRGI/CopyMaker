import { Container, Item, List } from './SubjectsModal.styled';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubjectsModal = ({ isOpen, onClose, subjects }) => {
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
    return (
        <Container
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Subjects Modal"
            ariaHideApp={false}
        >
            <List>
                {subjects.map((item, index) => (
                    <Item key={index} onClick={() => {
                        navigator.clipboard.writeText(item);
                        handleCopy();
                      }}>{item}</Item>
                ))}
            </List>
        </Container>
    );
};

export default SubjectsModal;
