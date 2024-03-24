
import { useSelector } from "react-redux";
import { getDomains } from "../../redux/selectors";

const Home = () => {
    const domains = useSelector(getDomains);

    return (
        <div>
            {domains.length > 0 ? (
                <h1>Domains</h1>
            ) : <h2>Not have domains</h2>}
            <h1>Home Page</h1>

        </div>
        
        
    )
}

export default Home;