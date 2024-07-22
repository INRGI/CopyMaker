
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";
import DomainForm from "../../components/DomainForm/DomainForm";
import DomainList from "../../components/DomainList/DomainList";
import Filter from "../../components/Filter/Filter";
import { Container, DomainsContainer, EmailFilterButton, EmptyDomains, LeftContainer, MakeUniqueButton } from "./Home.styled";
import { Helmet } from "react-helmet";
import MakeUniqueModal from "../../components/MakeUniqueModa/MakeUniqueModal";
import { useState } from "react";
import AboutAuthor from "../../components/AboutAuthor/AboutAuthor";
import { useLocation } from "react-router-dom";
import UploadInfo from "../../components/UploadInfo/UploadInfo";


const Home = () => {
    const domains = useSelector(getDomains);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const location = useLocation();

    return (
        <>
        <Container>
            <Helmet>
                <title>Your Domains</title>
            </Helmet>
            <LeftContainer>
                <DomainForm />
                <MakeUniqueButton onClick={() => setModalIsOpen(true)}>Anti Spam</MakeUniqueButton>
                <EmailFilterButton to={`/emailFilter`} state={{ from: location }} >Email Filter</EmailFilterButton>
            </LeftContainer>
            <DomainsContainer>      
                {domains.length > 0 ? (
                <>
                    <Filter />
                    <DomainList />
                </>
                ) : (
                <EmptyDomains>Your domain list is empty.</EmptyDomains>
                )
            }
          </DomainsContainer>

            

          <MakeUniqueModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            />   
        </Container>
        <UploadInfo />
        <AboutAuthor></AboutAuthor>
        </>
    )
}

export default Home;