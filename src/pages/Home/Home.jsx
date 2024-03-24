
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";
import DomainForm from "../../components/DomainForm/DomainForm";

const Home = () => {
    const domains = useSelector(getDomains);

    return (
        <div>
            <DomainForm />
            {domains.length > 0 ? (
                domains.map(domain => <h3 key={domain.id}>{domain.name}</h3>)
            ) : <h2>Not have domains</h2>}
            <h1>Home Page</h1>

        </div>
        
        
    )
}

export default Home;