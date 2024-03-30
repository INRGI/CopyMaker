
import { useParams } from "react-router-dom";
import FormPromo from "../../components/FormPromo";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const DomainPage = () => {
    const { domainId } = useParams();
    const domain = useSelector(state => state.domains.find(domain => domain.id === domainId));

    return (
        <>
            <Helmet>
                <title>{domain.name}</title>
            </Helmet>
            <FormPromo />
        </>
    )
}

export default DomainPage;