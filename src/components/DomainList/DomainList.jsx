import { useDispatch, useSelector } from "react-redux";
import { selectVisibleDomains } from "../../redux/selectors";
import { Button, ButtonEdit, ButtonsContainer, Container, Domain } from "./DomainList.styled";
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { deleteDomain } from '../../redux/domainSlice';
import EditModal from "../EditModal/EditModal";

const DomainList = () => {
    const visibleDomains = useSelector(selectVisibleDomains);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [domainToDelete, setDomainToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [domainToEdit, setDomainToEdit] = useState(null);

    const handleDeleteClick = (id) => {
        setDomainToDelete(id);
        setIsModalOpen(true);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDomainToDelete(null);
    };

    const handleEditClick = (domain) => {
        setDomainToEdit(domain);
        setIsEditModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (domainToDelete) {
            dispatch(deleteDomain(domainToDelete));
            setIsModalOpen(false);
            setDomainToDelete(null);
            toast.success('Domain successfully deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handleConfirmEdit = () => {
        setIsEditModalOpen(false);
        setDomainToEdit(null);
    };
        return (
            <Container>
                {visibleDomains.map(domain => (
                <Domain key={domain.id}>
                    {domain.name}
                    <ButtonsContainer>
                        <ButtonEdit type='button' name='edit' 
                        onClick={() => handleEditClick(domain)}
                        >
                            Edit
                        </ButtonEdit>
                        <Button
                            type='button'
                            name='delete'
                            onClick={() => handleDeleteClick(domain.id)}
                        >
                            Delete
                        </Button>
                    </ButtonsContainer>
                </Domain>
            ))}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={handleConfirmEdit}
                domain={domainToEdit}
            />
        </Container>
        );
}

export default DomainList;