
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";
import DomainForm from "../../components/DomainForm/DomainForm";
import DomainList from "../../components/DomainList/DomainList";
import Filter from "../../components/Filter/Filter";
import { Container, DomainsContainer, EmptyDomains } from "./Home.styled";
import { Helmet } from "react-helmet";

const Home = () => {
    const domains = useSelector(getDomains);

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
                <EmptyDomains>Your phonebook is empty.</EmptyDomains>
                )
            }
          </DomainsContainer>
        </Container>
    )
}

export default Home;