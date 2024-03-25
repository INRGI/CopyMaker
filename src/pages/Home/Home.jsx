
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";
import DomainForm from "../../components/DomainForm/DomainForm";
import DomainList from "../../components/DomainList/DomainList";
import Filter from "../../components/Filter/Filter";

const Home = () => {
    const domains = useSelector(getDomains);

    return (
        <div>
            <Filter />
            <DomainForm />
            {domains.length > 0 ? (<DomainList />)
            : <h2>Not have domains</h2>}
            <h1>Home Page</h1>

        </div>
        
        
    )
}

export default Home;