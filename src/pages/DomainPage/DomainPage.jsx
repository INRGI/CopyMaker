
import { useParams } from "react-router-dom";
import FormPromo from "../../components/FormPromo";
import { Helmet } from "react-helmet";

const DomainPage = () => {
    const { domainId } = useParams();

    return (
        <>
            <Helmet>
                <title>{domainId}</title>
            </Helmet>
            <FormPromo />
        </>
    )
}

export default DomainPage;