import { useParams } from "react-router-dom";
import FormPromo from "../../components/FormPromo";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const DomainPage = () => {
    const { domainId } = useParams();
    const domains = useSelector(state => state.domains);
    const domain = domains.find(domain => domain.id === domainId);
    const domainName = domain ? domain.name : "Loading...";

    return (
        <>
            <Helmet>
                <title>{domainName}</title>
            </Helmet>
            <FormPromo />
        </>
    )
}

export default DomainPage;
