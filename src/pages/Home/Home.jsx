
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";
import DomainForm from "../../components/DomainForm/DomainForm";
import DomainList from "../../components/DomainList/DomainList";
import Filter from "../../components/Filter/Filter";
import { Container, DomainsContainer, EmptyDomains } from "./Home.styled";
import { Helmet } from "react-helmet";
import MakeUniqueModal from "../../components/MakeUniqueModa/MakeUniqueModal";
import { useState } from "react";

const Home = () => {
    const domains = useSelector(getDomains);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <Container>
            <Helmet>
                <title>Your Domains</title>
            </Helmet>
            <DomainForm />
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
    )
}

export default Home;