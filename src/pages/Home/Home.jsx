
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";
import DomainForm from "../../components/DomainForm/DomainForm";
import DomainList from "../../components/DomainList/DomainList";

const Home = () => {
    const domains = useSelector(getDomains);

    return (
        <div>
            <DomainForm />
            {domains.length > 0 ? (<DomainList domains={domains} />)
            : <h2>Not have domains</h2>}
            <h1>Home Page</h1>

        </div>
        
        
    )
}

export default Home;